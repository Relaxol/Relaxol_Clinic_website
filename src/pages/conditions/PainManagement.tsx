import ConditionPage from "@/components/ConditionPage";
import { defaultConditionContent } from "@/lib/templates/newDefaults";
import conditionPain from "@/assets/condition-pain-new.jpg";

const PainManagement = () => (
  <ConditionPage 
    slug="pain-management" 
    fallbackImage={conditionPain} 
    fallback={defaultConditionContent['pain-management']} 
  />
);

export default PainManagement;
