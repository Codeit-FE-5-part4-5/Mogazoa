import useGetMe from '@/models/queries/auth/useGetMe';
import ActivityCard from '@/components/feature/product/ActivityCard/ActivityCard';

const ActivitySection = () => {
  const { data: user } = useGetMe();

  return (
    <div className="mt-[52px] space-y-[30px] text-var-white xl:mt-0">
      <h1 className="text-[18px] font-semibold">활동 내역</h1>
      <div className="flex space-x-2.5 xl:space-x-5">
        <div className="w-full">
          <ActivityCard status="averageLeft" conScore={user?.averageRating} />
        </div>
        <div className="w-full">
          <ActivityCard status="reviewsLeft" conScore={user?.reviewCount} />
        </div>
        <div className="w-full">
          <ActivityCard
            status="interest"
            text={user?.mostFavoriteCategory?.name}
            color="#23b581"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;
