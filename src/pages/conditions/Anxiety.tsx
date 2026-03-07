import ConditionPage from "@/components/ConditionPage";
import { defaultConditionContent } from "@/lib/templates/newDefaults";
import conditionAnxiety from "@/assets/condition-anxiety-new.jpg";

const Anxiety = () => (
  <ConditionPage 
    slug="anxiety" 
    fallbackImage={conditionAnxiety} 
    fallback={defaultConditionContent.anxiety} 
  />
);

export default Anxiety;
