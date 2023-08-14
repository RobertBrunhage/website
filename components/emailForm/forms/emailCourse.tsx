import React from "react";
import { eventPropNewsletter, eventSignup } from "../../../core/constants";
import Newsletter from "../../newsletter/newsletter";

interface EmailListProps {
  color: string;
}

const EmailList = ({ color }:EmailListProps) => {
  return (
    <div>
      <Newsletter
        color={color}
        title="Get updates on the progress & Launch"
        description="I’m working hard on the course and my plan is to have it out late 2021. Sign up to get course updates and be the first to get notified on release!"
        giveaway="When you sign up you are also eligible to win this course"
        cta="GET UPDATES"
        img="/assets/icons/movie_course.svg"
        action="https://gmail.us2.list-manage.com/subscribe/post?u=ff73d806dd2f49da87ede8337&amp;id=ed4e712aca&amp;SIGNUP=FlutterMovieCourse"
        plausibleEvent={eventSignup}
        plausibleEventProp={eventPropNewsletter}
      />
    </div>
  );
};

export default EmailList;
