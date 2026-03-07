import ConditionPage from "@/components/ConditionPage";
import { defaultConditionContent } from "@/lib/templates/newDefaults";
import conditionPtsd from "@/assets/condition-ptsd-new.jpg";

const PTSD = () => (
  <ConditionPage 
    slug="ptsd" 
    fallbackImage={conditionPtsd} 
    fallback={defaultConditionContent.ptsd} 
  />
);

export default PTSD;
