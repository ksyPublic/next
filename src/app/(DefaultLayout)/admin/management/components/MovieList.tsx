import React, { useState } from 'react';
import { DataTable } from '@/components';
import { MovieListProps, MovieValue } from './types';
import Link from 'next/link';
import Image from 'next/image';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const storage = getStorage();
const MovieList = ({ data }: MovieListProps) => {
	const [url, setUrl] = useState<Array<{}>>([]);
	const getUrl = async (value: MovieValue) => {
		const origin = value?.titleKR;
		const storageRef = ref(storage, `images/poster/${origin}/image`);
		try {
			const response = await getDownloadURL(storageRef);
			if (response) {
				setUrl([{ image: response }]);
			}
		} catch (error) {
			console.error('다운로드 URL을 가져오는 데 실패했습니다: ', error);
			setUrl([
				{
					image:
						'/images/common/KR-ko-20230703-popsignuptwoweeks-perspective_alpha_website_small.jpg',
				},
			]);
		}
	};
	return (
		<DataTable.Wrapper caption="등록된 컨텐츠 목록">
			<colgroup>
				<col width="60rem" />
				<col width="auto" />
				<col width="120rem" />
				<col width="120rem" />
				<col width="120rem" />
			</colgroup>
			<DataTable.Head>
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>관람연령</th>
					<th>개봉년월일</th>
					<th>등록날짜</th>
				</tr>
			</DataTable.Head>
			<DataTable.Body>
				<>
					{data &&
						Object.entries(data).map(
							([key, value]: [string, MovieValue], i: number) => {
								if (!value) return;
								getUrl(value);

								return (
									<tr key={key}>
										<td>{i + 1}</td>
										<td className="!text-left">
											<Link
												href={`/admin/management/${key}`}
												className="hover:underline flex items-center"
											>
												<span className="shrink-0">
													<Image
														src={`${url}`}
														width={80}
														height={120}
														alt={`${value?.titleKR} 썸네일`}
													/>
												</span>
												<div className="flex items-center flex-col ml-4">
													<span className="block">{value.titleKR}</span>
													<span className="block lato text-sm mt-2">
														{value.titleEN}
													</span>
												</div>
											</Link>
										</td>
										<td>{value.rating}</td>
										<td>{value.release}</td>
										<td>{value.addDate}</td>
									</tr>
								);
							},
						)}
				</>
			</DataTable.Body>
		</DataTable.Wrapper>
	);
};

export default MovieList;
