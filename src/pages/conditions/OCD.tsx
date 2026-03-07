import ConditionPage from "@/components/ConditionPage";
import { defaultConditionContent } from "@/lib/templates/newDefaults";
import conditionOcd from "@/assets/condition-ocd-new.jpg";

const OCD = () => (
  <ConditionPage 
    slug="ocd" 
    fallbackImage={conditionOcd} 
    fallback={defaultConditionContent.ocd} 
  />
);

export default OCD;
