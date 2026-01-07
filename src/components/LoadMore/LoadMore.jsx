import css from "./LoadMore.module.css";
import { useSelector } from "react-redux";
import {
  selectTeachersHasMore,
  selectTeachersLoading,
} from "../../redux/teachersSelectors";

const LoadMore = () => {
  const hasMore = useSelector(selectTeachersHasMore);
  const loading = useSelector(selectTeachersLoading);

  return (
    <>
      <div>LoadMore Component</div>
    </>
  );
};
export default LoadMore;
