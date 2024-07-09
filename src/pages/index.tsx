import { RankingList } from '@/shared/components/RankingList/RankingList';
import { SlideMenu } from '@/shared/components/SlideMenu/SlideMenu';
import { Header } from '@/shared/components/header/header';

export default function Home() {
  return (
    <div>
      <Header /> <SlideMenu /> <RankingList />
    </div>
  );
}
