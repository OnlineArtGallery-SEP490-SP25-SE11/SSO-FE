'use client';
import { fetchArtPiecesByRange } from '@/app/(public)/[locale]/gallery/api';
import ArtCard from '@/app/(public)/[locale]/gallery/components/art-card';
import ArtModal from '@/app/(public)/[locale]/gallery/components/art-modal';
import ArtFeed from '@/app/(public)/[locale]/gallery/components/art-feed';
import { ArtPiece } from '@/types/marketplace';
import { List, Masonry, useInfiniteLoader } from 'masonic';
import { useCallback, useMemo, useState } from 'react';
import FloatingSidebar from './components/art-sidebar';
import { AnimatePresence, motion } from 'framer-motion';

export default function Gallery({ artworks }: { artworks: ArtPiece[] }) {
	const [artPieces, setArtPieces] = useState<ArtPiece[]>(artworks);
	const [masonryLayout, setMasonryLayout] = useState<boolean>(true);

	const loadMore = useInfiniteLoader(
		async (startIndex, stopIndex, currentItems) => {
			const nextArtWorks = (await fetchArtPiecesByRange(
				startIndex,
				stopIndex
			)) as ArtPiece[];
			console.log(startIndex, stopIndex);
			console.log(currentItems);
			setArtPieces((current) => [...current, ...nextArtWorks]);
		},
		{
			isItemLoaded: (index, items) => !!items[index],
			minimumBatchSize: 10,
			threshold: 5
		}
	);

	const animation = useMemo(() => {
		return {
			variants: {
				hidden: { opacity: 0, y: 20 },
				visible: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -20 }
			},
			transition: {
				type: 'spring',
				stiffness: 300,
				damping: 30,
				duration: 0.2
			}
		};
	}, []);
	const changeLayout = useCallback(() => {
		setMasonryLayout((prev) => !prev);
	}, []);

	const MasonryLayout =
		// useCallback(
		() => (
			<motion.div
				key='masonry'
				initial='hidden'
				animate='visible'
				exit='exit'
				variants={animation.variants}
				transition={animation.transition}
				className='pl-10'
			>
				<Masonry
					onRender={loadMore}
					items={artPieces}
					columnGutter={20}
					columnWidth={280}
					overscanBy={1.5}
					render={ArtCard}
				/>
			</motion.div>
		);

	const ListLayout = () => (
		<motion.div
			key='list'
			initial='hidden'
			animate='visible'
			exit='exit'
			variants={animation.variants}
			transition={animation.transition}
			className='w-full'
			// style={{
			// 	height: '670px',
			// 	overflowY: 'scroll',
			// 	scrollSnapType: 'y mandatory',
			// 	scrollbarWidth: 'none',
			// } as CSSProperties}
		>
			<List
				onRender={loadMore}
				items={artPieces}
				render={ArtFeed}
				// render={({ data, index }) => (
				// 	<ArtFeed data={data} index={index} />
				// )}
				rowGutter={67}
				overscanBy={1.5}
			/>
		</motion.div>
	);
	return (
		<>
			<FloatingSidebar changeLayout={changeLayout} />
			<div className='p-5'>
				<AnimatePresence mode='wait'>
					<motion.div layout>
						{masonryLayout ? <MasonryLayout /> : <ListLayout />}
					</motion.div>
				</AnimatePresence>
			</div>
			<ArtModal />
		</>
	);
}
