import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { selectLoading } from "../../features/project/projectSlice";

export function Loading(props) {
  const history = useHistory();
  const loading = useSelector(selectLoading);
  const params = useParams();
  useEffect(() => {
    if (loading === undefined) return;
    if (!loading) {
      history.push("/" + params.page);
    }
  }, [loading, params, history]);
  return (
    <div>
      <div className="load-logo">
        <i class="fas fa-list-alt"></i>PROJECT-TODO
      </div>
      <div className="load-body">
        <i class="fas fa-spinner"></i>
      </div>
      <div className="load-footer"></div>
    </div>
  );
}
