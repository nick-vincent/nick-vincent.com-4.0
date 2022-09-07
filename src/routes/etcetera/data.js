import dayjs from 'dayjs';
import slugify from 'slugify';
import { data as photosData } from '../../img/photos/_manifest.js';
import { data as facesData } from '../../img/faces/_manifest.js';

function loadFiles(folder) {
	let thumbFiles, imageFiles;

	switch (folder) {
		case 'photos':
			thumbFiles = import.meta.glob('../../img/photos/*.jpg', {
				eager: true,
				as: 'w=280&h=280&webp&meta=src'
			});
			imageFiles = import.meta.glob('../../img/photos/*.jpg', {
				eager: true,
				as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
			});
			break;
		case 'faces':
			thumbFiles = import.meta.glob('../../img/faces/*.png', {
				eager: true,
				as: 'w=280&h=280&webp&meta=src'
			});
			imageFiles = import.meta.glob('../../img/faces/*.png', {
				eager: true,
				as: 'w=1920&h=1200&webp&quality=100&fit=inside&meta=src;aspect;width;height'
			});
			break;
	}

	return { thumbFiles, imageFiles };
}

export const getImageData = function (
	folder,
	extension = 'jpg',
	titleTemplate = (t) => t,
	captionTemplate = (c) => c
) {
	const images = [];
	const { thumbFiles, imageFiles } = loadFiles(folder);
	const data = folder === 'photos' ? photosData : facesData;

	for (let i = 0; i < data.length; i++) {
		const image = { ...data[i] };
		const slug = `${image.date}-${slugify(image.title, { lower: true, strict: true })}`;
		const url = `/etcetera/${folder}/${slug}/`;
		const date = dayjs(image.date).format('MMMM D, YYYY');
		const path = `../../img/${folder}/${slug}.${extension}`;
		const thumb = thumbFiles[path].src;
		const title = titleTemplate(image.title);
		const caption = captionTemplate(image.caption);
		const { src, aspect, width, height } = imageFiles[path];
		images[i] = { ...image, title, caption, slug, url, date, thumb, src, aspect, width, height };
	}
	return images;
};
