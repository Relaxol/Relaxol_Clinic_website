import ConditionPage from "@/components/ConditionPage";
import { defaultConditionContent } from "@/lib/templates/newDefaults";
import conditionDepression from "@/assets/condition-depression-new.jpg";

const Depression = () => (
  <ConditionPage 
    slug="depression" 
    fallbackImage={conditionDepression} 
    fallback={defaultConditionContent.depression} 
  />
);

export default Depression;
