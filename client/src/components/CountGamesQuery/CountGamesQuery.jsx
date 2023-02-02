import "./countgamesquery.scss";
import { useFetchCountGamesQuery } from "../../store/services/UsersService";

const CountGamesQuery = () => {
  const { data = [] } = useFetchCountGamesQuery();
  let count = 0;
  return (
    <div>
      {data &&
        data.map((user) => (
          <div key={user.id}>
            <div>
              {++count}. {user.name} очки: {user.count}
            </div>
          </div>
        ))}
    </div>
  );
};

export default CountGamesQuery;
