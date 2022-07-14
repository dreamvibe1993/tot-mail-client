import { useHistory } from "react-router-dom";

export const useGoBack = () => {
  const history = useHistory();

  return () => {
    const slugs = history.location.pathname.split("/");
    const oneSlugBack = slugs.slice(0, slugs.length - 1);
    const url = oneSlugBack.join("/");
    history.push(url);
  };
};
