import { RankingList } from '@/shared/components/RankingList/RankingList';
import { SlideMenu } from '@/shared/components/SlideMenu/SlideMenu';
import { Header } from '@/shared/components/header/header';

export default function Home() {
  return (
    <div>
      <Header />
      <div className="flex flex-row overflow-hidden">
        <div>
          <SlideMenu />
        </div>
        <div className="overflow-x-auto">
          <RankingList />
        </div>
      </div>
    </div>
  );
}
