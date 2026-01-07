import css from "./LoadMore.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTeachersHasMore,
  selectTeachersLoading,
} from "../../redux/teachersSelectors";
import { fetchMoreTeachers } from "../../redux/teachersSlice";
import { selectActiveFilter } from "../../redux/filtersSelectors";

const LoadMore = () => {
  const dispatch = useDispatch();
  const hasMore = useSelector(selectTeachersHasMore);
  const loading = useSelector(selectTeachersLoading);
  const activeFilter = useSelector(selectActiveFilter);
  if (activeFilter) {
    return null;
  }
  if (!hasMore) {
    return null;
  }

  const clickHandler = () => {
    dispatch(fetchMoreTeachers());
  };

  return (
    <button
      className={css.loadMore}
      disabled={!hasMore || loading}
      onClick={clickHandler}
    >
      {loading ? "Loading..." : hasMore ? "Load More" : "No More Teachers"}
    </button>
  );
};
export default LoadMore;
