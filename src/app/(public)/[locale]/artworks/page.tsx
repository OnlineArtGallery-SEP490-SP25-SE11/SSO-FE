import { fetchArtPiecesByRange } from '@/app/(public)/[locale]/artworks/api';
import { ArtPiece } from '@/types/marketplace';
import dynamic from 'next/dynamic';
import { LoadingComponent } from '@/components/ui.custom/loading';

const Artworks = dynamic(
	() => import('@/app/(public)/[locale]/artworks/artworks'),
	{
		ssr: false,
		loading(loadingProps) {
			return (
				<LoadingComponent
					error={loadingProps.error}
					timedOut={loadingProps.timedOut}
					pastDelay={loadingProps.pastDelay}
					retry={loadingProps.retry}
				/>
			);
		}
	}
);

const ArtworksPage = async () => {
	const initialData = (await fetchArtPiecesByRange(0, 20)) as ArtPiece[];
	return (
		<>
			<Artworks artworks={initialData} />
		</>
	);
};
export default ArtworksPage;
