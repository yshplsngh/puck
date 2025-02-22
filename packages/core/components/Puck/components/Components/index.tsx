import { useComponentList } from "../../../../lib/use-component-list";
import { useAppContext } from "../../context";
import { ComponentList } from "../../../ComponentList";
import { useMemo } from "react";

export const Components = () => {
  const { config, state, overrides } = useAppContext();

  // console.log("config", config);
  // console.log("state", state);
  // console.log("overrides", overrides);
  const componentList = useComponentList(config, state.ui);
  // console.log("componentList", componentList);
  const Wrapper = useMemo(() => overrides.components || "div", [overrides]);

  return (
    <Wrapper>
      {componentList ? componentList : <ComponentList id="all" />}
    </Wrapper>
  );
};
