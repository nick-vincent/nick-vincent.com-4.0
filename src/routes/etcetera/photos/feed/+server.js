export const prerender = true;

import { getImageData } from '../../data';
import { getRssItem } from '../../rss';
import Photo from '../../../../img/nick-vincent.jpg?png&w=480&h=480&meta=src';

const images = getImageData('photos');

export function GET() {
	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};
	return new Response(
		`<?xml version="1.0" encoding="UTF-8" ?>
			<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
				<channel>
					<atom:link href="https://nick-vincent.com/etcetera/photos/feed" rel="self" type="application/rss+xml" />
					<title>Nick Vincent → Photos</title>
					<link>https://nick-vincent.com/etcetera/photos/</link>
					<description>Photography from various locales around the world.</description>	
					<image>
						<url>https://nick-vincent.com${Photo.src}</url>
						<title>Nick Vincent → Photos</title>
						<link>https://nick-vincent.com/etcetera/photos/</link>
					</image>			
					${images.map((image) => getRssItem(image)).join('')}
				</channel>
			</rss>
		`,
		{ headers }
	);
}
