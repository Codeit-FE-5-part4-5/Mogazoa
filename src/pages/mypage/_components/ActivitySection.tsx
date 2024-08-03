import useGetMe from '@/models/queries/auth/useGetMe';
import ActivityCard from '@/components/feature/product/ActivityCard/ActivityCard';

const ActivitySection = () => {
  const { data: user } = useGetMe();

  return (
    <div className="mt-[50px] space-y-[30px] xl:mt-0">
      <div>활동 내역</div>
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
