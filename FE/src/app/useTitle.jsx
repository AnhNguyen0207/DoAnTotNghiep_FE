import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../features/titleSlice";

const useTitle = (ele, title) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setTitle({
        title: ele || '',
      })
    );
    document.title = title || "Inventory Management";
  }, [dispatch, ele, title]);
};

export default useTitle;
