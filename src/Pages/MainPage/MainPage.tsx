import { useQuery } from '@tanstack/react-query';
import { getContributionData } from '../../Services/http';

function MainPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['contribution'],
    queryFn: () => getContributionData(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return <div className="page">Главный экран</div>;
}

export default MainPage;
