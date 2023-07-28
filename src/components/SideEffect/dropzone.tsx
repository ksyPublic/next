import React, { useCallback, useState, useRef, ChangeEvent } from 'react';
import { IconButton } from '@/components';
import { formatBytes } from '@/utils/format';
import { useDropzone } from 'react-dropzone';
import { useRefObjectAsForwardedRef } from '../hooks/useRefObjectAsForwardedRef';
import { ForwardRefComponent as PolymorphicForwardRefComponent } from '../utils/polymorphic';
import getElementType from '../utils/getElementType';
import {
	Control,
	Controller,
	Noop,
	RefCallBack,
	RegisterOptions,
} from 'react-hook-form';
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	deleteObject,
} from 'firebase/storage';
import cx from 'clsx';

type DropZoneProps = {
	storageKey?: string;
	placeholder?: string;
	className?: string;
	name: string;
	disabled?: boolean;
	control: Control; // react-hook-form Control
	rules?: RegisterOptions; // react-hook-form rules
};

const DropZone = React.forwardRef(
	(
		{
			storageKey,
			placeholder,
			className,
			disabled,
			control,
			name,
			rules,
			onChange,
			...props
		},
		forwardedRef,
	) => {
		const [fileInfo, setFileInfo] = useState<
			| {
					name: string;
					size: number;
					type: string;
			  }
			| null
			| undefined
		>(); // 상태 추가
		const [downloadUrl, setDownloadUrl] = useState<string>(''); // 상태 추가

		const dropType = (params: string) => {
			if (params.match(/image.*/)) {
				return 'image';
			} else if (params.match(/video.*/)) {
				return 'video';
			}
		};

		const onDrop = useCallback(
			(acceptedFiles: any, field: { onChange: (arg0: any) => void }) => {
				// 파일을 Cloud Storage에 업로드합니다.
				const file = acceptedFiles[0]; // 단일 파일 업로드만 지원하는 예
				const typeName = dropType(file.type);
				const storage = getStorage();
				const storageRef = ref(storage, `${storageKey}/${typeName}`);
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
					},
					(error) => {
						console.error('Upload failed:', error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							setDownloadUrl(downloadURL); // 상태 업데이트
						});

						//파일업로드가 완료된후 변경
						setFileInfo({
							name: file.name,
							type: file.type,
							size: file.size,
						}); // 상태 업데이트

						field.onChange(file);
					},
				);
			},

			[storageKey],
		);

		const deleteFile = async (field: {
			onChange: any;
			onBlur?: Noop;
			value?: any;
			name?: string;
			ref?: RefCallBack;
		}) => {
			// Firebase Storage에서 파일을 삭제합니다.
			const storage = getStorage();
			const typeName = dropType(fileInfo!.type);
			const fileRef = ref(storage, `${storageKey}/${typeName}`);

			deleteObject(fileRef)
				.then(() => {
					console.log('File deleted successfully');
					setFileInfo(null); // 상태 초기화
					setDownloadUrl(''); // 상태 초기화
					field.onChange(null);
				})
				.catch((error) => {
					console.error('Failed to delete file:', error);
				});
		};

		const classes = cx(
			'ui-dropzone w-full bg-gray-700',
			`${className ? className : ''}`,
			`${
				disabled
					? 'pointer-events-none opacity-60'
					: 'pointer-events-auto opacity-100'
			}`,
		);
		const ElementType = getElementType(DropZone, props);
		const dropzoneRef = useRef<HTMLInputElement>(null);
		useRefObjectAsForwardedRef(forwardedRef, dropzoneRef);
		return (
			<Controller
				control={control}
				name={name}
				rules={rules}
				render={({ field }) => {
					const { getRootProps, getInputProps } = useDropzone({
						onDrop: (acceptedFiles) => onDrop(acceptedFiles, field),
					});

					return (
						<ElementType
							{...getRootProps()}
							className={classes}
							ref={dropzoneRef}
						>
							<input
								{...getInputProps({ disabled: disabled })}
								name={field.name}
							/>
							{fileInfo ? (
								<div className="flex items-center">
									<p className="text-sm text-white">
										{fileInfo?.name}[{formatBytes(fileInfo?.size)}]
									</p>
									<IconButton
										icon="delete"
										onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
											e.stopPropagation();
											deleteFile(field);
										}}
										className="ml-4 relative z-10"
									/>
								</div>
							) : (
								<p className="text-gray-400 text-sm">{placeholder}</p>
							)}
						</ElementType>
					);
				}}
			/>
		);
	},
) as PolymorphicForwardRefComponent<'input', DropZoneProps>;

DropZone.displayName = 'Input';

export { DropZone };
