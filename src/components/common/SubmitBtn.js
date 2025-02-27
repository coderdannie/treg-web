import { useNavigation } from 'react-router-dom';

const SubmitBtn = ({ text, values }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const isFormValid = Object.values(values).every(
    (value) => value.trim() !== ''
  );

  return (
    <button
      type="submit"
      className="btn bg-[#3B2770] text-white btn-block"
      disabled={!isFormValid}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text || 'submit'
      )}
    </button>
  );
};
export default SubmitBtn;
