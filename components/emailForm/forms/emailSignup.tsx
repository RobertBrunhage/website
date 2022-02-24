import React from "react";
import { eventPropNewsletter, eventSignup } from "../../../core/constants";
import EmailForm from "../emailForm";

interface EmailSignupProps {
  color: string;
}

const emailSignup = ({ color }: EmailSignupProps) => {
  return (
    <div>
      <EmailForm
        color={color}
        title="Get my free Flutter Tips PDF"
        description="Level up your skills by joining 1600+ other Flutter developers!"
        cta="LEVEL UP"
        action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca"
        plausibleEvent={eventSignup}
        plausibleEventProp={eventPropNewsletter}
      />
    </div>
  );
};

export default emailSignup;
