'use client';

import React, { useState } from 'react';
import {
	Segment,
	ControlLine,
	Text,
	ButtonGroup,
	Button,
	Form,
	Label,
	Input,
	Select,
	Textarea,
	DropZone,
	MessageBox,
	Datepicker,
} from '@/components';
import { useForm, Resolver } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Genre, AgeRating, ContentType } from '@/utils/enum';
import { post } from '@/utils/api';
import { getFirestore, setDoc, collection, doc } from '@/store/client';
import type { ItemInput } from '@/components';

type FormValues = {
	addKey?: string;
	titleKR?: string;
	titleEN?: string;
	contentType?: string;
	director?: string;
	cast?: string;
	genre?: string;
	rating?: string;
	release?: string;
	summary?: string;
	poster?: string;
	runningTime?: number;
	trailer?: string;
	videos?: string;
};

const resolver: Resolver<FormValues> = async (values) => {
	let errors = {};
	if (!values.titleKR) {
		errors = {
			...errors,
			titleKR: {
				type: 'required',
				message: '· 제목입력은 필수입니다.',
			},
		};
	}

	if (!values.titleEN) {
		errors = {
			...errors,
			titleEN: {
				type: 'required',
				message: '· 영문 제목입력은 필수입니다.',
			},
		};
	}

	if (!values.contentType) {
		errors = {
			...errors,
			contentType: {
				type: 'required',
				message: '· 컨텐츠 유형 선택은 필수입니다.',
			},
		};
	}

	if (!values.director) {
		errors = {
			...errors,
			director: {
				type: 'required',
				message: '· 감독입력은 필수입니다.',
			},
		};
	}
	if (!values.cast) {
		errors = {
			...errors,
			cast: {
				type: 'required',
				message: '· 출연진입력은 필수입니다.',
			},
		};
	}

	if (!values.genre) {
		errors = {
			...errors,
			genre: {
				type: 'required',
				message: '· 장르 선택은 필수입니다.',
			},
		};
	}

	if (!values.rating) {
		errors = {
			...errors,
			rating: {
				type: 'required',
				message: '· 시청등급 선택은 필수입니다.',
			},
		};
	}

	if (!values.runningTime) {
		errors = {
			...errors,
			runningTime: {
				type: 'required',
				message: '· 러닝타임 입력은 필수입니다.',
			},
		};
	}

	if (!values.release) {
		errors = {
			...errors,
			release: {
				type: 'required',
				message: '· 개봉년도 입력은 필수입니다.',
			},
		};
	}

	if (!values.summary) {
		errors = {
			...errors,
			summary: {
				type: 'required',
				message: '· 줄거리 입력은 필수입니다.',
			},
		};
	}

	if (!values.poster) {
		errors = {
			...errors,
			poster: {
				type: 'required',
				message: '· 포스터 이미지는 필수입니다.(이미지를 넣어주세요)',
			},
		};
	}

	if (!values.trailer) {
		errors = {
			...errors,
			trailer: {
				type: 'required',
				message: '· 트레일러 영상은 필수입니다.(트레일러 영상을 넣어주세요)',
			},
		};
	}

	if (!values.videos) {
		errors = {
			...errors,
			videos: {
				type: 'required',
				message: '· 메인 영상은 필수입니다.',
			},
		};
	}

	return {
		values: Object.keys(errors).length ? {} : values,
		errors,
	};
};

const db = getFirestore();

const AddMoviePage = () => {
	const router = useRouter();
	const [startDate, setStartDate] = useState<string>('2023.01.01');
	const [uniqueKey, setUniqueKey] = useState<string>('');
	const [disabled, setDisabled] = useState<boolean>(true);

	/** rating */

	const [ratingOpen, ratingSetOpen] = useState(false);
	const [ratingFilter, setRatingFilter] = useState('');
	const filteredItems = AgeRating.filter((item) => {
		item.text.toLowerCase().startsWith(ratingFilter.toLowerCase());
	});

	const [ratingSelected, ratingSetSelected] = React.useState<ItemInput[]>([
		AgeRating[0],
		AgeRating[1],
	]);

	const onTitleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUniqueKey(event.target.value);

		if (event.target.value.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	};

	const addContentUpdate = async (data: any) => {
		const getKey = uniqueKey?.replace(/\s+/g, '').replace(/\./g, '');
		const setData = {
			addKey: getKey,
			...data,
		};
		// 현재 날짜를 얻어서 YYYY-MM-DD 형식의 문자열로 변환
		const date = new Date();
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 월에 1을 더하고, 결과가 한 자리수이면 앞에 '0'을 붙입니다.
		const day = String(date.getDate()).padStart(2, '0'); // 일이 한 자리수이면 앞에 '0'을 붙입니다.

		const formattedDate = `${year}-${month}-${day}`;
		await setDoc(doc(db, 'contents', `${getKey}`), {
			setData,
			formattedDate,
		})
			.then(() => {
				console.log('Document successfully written!');
				router.push('/admin/management');
			})
			.catch((error) => {
				console.error('Error writing document: ', error);
			});
	};

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({ resolver });

	return (
		<Segment className="w-full px-10 mt-4">
			<ControlLine
				content={<Text className="text-xlg text-white" name="컨텐츠 등록" />}
			/>
			<Form onSubmit={handleSubmit(addContentUpdate)} id="addcontent">
				<Form.Row>
					<Form.Column>
						<Label name="제목" htmlFor="titleKR" />
						<div className="flex flex-col w-full">
							<Input
								{...register('titleKR')}
								className="w-full"
								id="titleKR"
								placeholder="제목을 입력해주세요."
								onBlur={onTitleBlur}
							/>
							{errors?.titleKR && (
								<MessageBox text={errors.titleKR.message} error />
							)}
						</div>
					</Form.Column>
					<Form.Column>
						<Label name="영문제목" htmlFor="titleEN" />
						<div className="flex flex-col w-full">
							<Input
								{...register('titleEN')}
								className="w-full"
								id="titleEN"
								placeholder="영문 제목을 입력해주세요."
							/>
							{errors?.titleEN && (
								<MessageBox text={errors.titleEN.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="컨텐츠 유형" htmlFor="contentType" />
						<div className="flex flex-col w-full">
							<Select
								{...register('contentType')}
								id="contentType"
								selectOptions={ContentType}
								placeholder="장르를 선택하세요."
							/>
							{errors?.contentType && (
								<MessageBox text={errors.contentType.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="감독" htmlFor="director" />
						<div className="flex flex-col w-full">
							<Input
								{...register('director')}
								placeholder="감독을 입력해주세요."
								className="w-full"
								id="director"
							/>
							{errors?.director && (
								<MessageBox text={errors.director.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="출연진" htmlFor="cast" />
						<div className="flex flex-col w-full">
							<Input
								{...register('cast')}
								placeholder="출연진을 입력해주세요."
								className="w-full"
								id="cast"
							/>
							{errors?.cast && <MessageBox text={errors.cast.message} error />}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="장르" htmlFor="genre" />
						<div className="flex flex-col w-full">
							<Select
								{...register('genre')}
								id="genre"
								placeholder="장르를 선택하세요."
							/>
							{errors?.genre && (
								<MessageBox text={errors.genre.message} error />
							)}
						</div>
					</Form.Column>
					<Form.Column>
						<Label name="시청등급" htmlFor="rating" />
						<div className="flex flex-col w-full">
							<Select
								{...register('rating')}
								open={ratingOpen}
								selected={ratingSelected}
								items={filteredItems}
								onOpenChange={ratingSetOpen}
								onSelectedChange={ratingSetSelected}
								onFilterChange={setRatingFilter}
								id="rating"
								placeholder="시청등급을 선택하세요."
							/>
							{errors?.rating && (
								<MessageBox text={errors.rating.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="개봉년도" htmlFor="release" />
						<div className="flex flex-col w-full">
							<Datepicker
								{...register('release')}
								value={startDate}
								onChange={(date) => {
									setStartDate(date);
								}}
							/>
							{errors?.release && (
								<MessageBox text={errors.release.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="줄거리" htmlFor="summary" />
						<div className="flex flex-col w-full">
							<Textarea
								{...register('summary')}
								placeholder="줄거리를 입력해주세요."
								rows={6}
								id="summary"
							></Textarea>
							{errors?.summary && (
								<MessageBox text={errors.summary.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="러닝타임" htmlFor="runningTime" />
						<div className="flex flex-col w-full">
							<Input
								{...register('runningTime')}
								type="number"
								placeholder="러닝타임을 입력해주세요."
								className="w-full"
								id="runningTime"
							/>
							{errors?.runningTime && (
								<MessageBox text={errors.runningTime.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="포스터 이미지 URL" htmlFor="poster" />
						<div className="flex flex-col w-full">
							<DropZone
								control={control}
								name="poster"
								rules={{ required: true }}
								disabled={disabled}
								placeholder="포스터 이미지를 넣어주세요."
								storageKey={`/images/poster/${uniqueKey}`}
							/>
							{errors?.poster && (
								<MessageBox text={errors.poster.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="트레일러" htmlFor="trailer" />
						<div className="flex flex-col w-full">
							<DropZone
								control={control}
								name="trailer"
								rules={{ required: true }}
								disabled={disabled}
								placeholder="트레일러 영상을 넣어주세요."
								storageKey={`/video/trailer/${uniqueKey}`}
							/>
							{errors?.trailer && (
								<MessageBox text={errors.trailer.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
				<Form.Row>
					<Form.Column>
						<Label name="컨텐츠" htmlFor="videos" />
						<div className="flex flex-col w-full">
							<DropZone
								control={control}
								name="videos"
								rules={{ required: true }}
								disabled={disabled}
								placeholder="컨텐츠 영상을 넣어주세요."
								storageKey={`/video/content/${uniqueKey}`}
							/>
							{errors?.videos && (
								<MessageBox text={errors.videos.message} error />
							)}
						</div>
					</Form.Column>
				</Form.Row>
			</Form>
			<ButtonGroup align="center" className="mt-10">
				<Button
					size="md"
					variant="secondary"
					onClick={() => router.push('/admin/management')}
				>
					목록가기
				</Button>
				<Button type="submit" size="md" form="addcontent" variant="tertiary">
					등록하기
				</Button>
			</ButtonGroup>
		</Segment>
	);
};

export default AddMoviePage;
