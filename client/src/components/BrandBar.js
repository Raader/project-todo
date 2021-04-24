import { useHistory } from "react-router";

export function BrandBar() {
  const history = useHistory();
  return (
    <div className="header-brand" onClick={() => history.push("/")}>
      <i class="fas fa-list-alt"></i> PROJECT-TODO
    </div>
  );
}
