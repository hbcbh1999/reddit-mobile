import React from 'react';
import './styles.less';

import { Anchor } from 'platform/components';

const T = React.PropTypes;

const GO_BACK = 'Go Back!';
const GO_TO_FRONTPAGE = 'Go to the front page!';
const ERROR_404 = 'Page Not Found';
const ERROR_403 = 'Sorry, you don\'t have access to this.';
const ERROR_GENERIC = (
  <div>
    <div>Something went wrong.</div>
    <div>Please refresh this page or</div>
  </div>
);

const ERROR_MAP = {
  '403': ERROR_403,
  '404': ERROR_404,
};

const ErrorPage = props => {
  // NOTE: the second condition is a side-effect of a bug in our platform
  // code, which is setting the url's referrer to itself. Ideally, only the
  // first condition is needed.
  const toFrontpage = props.referrer === '' || props.referrer === props.url;
  const href = toFrontpage ? '/' : props.referrer;
  const anchorContent = toFrontpage ? GO_TO_FRONTPAGE : GO_BACK;

  const errorContent = ERROR_MAP[String(props.status)] || ERROR_GENERIC;

  return (
    <div className='ErrorPage'>
      <div className='ErrorPage__image' />
      <div className='ErrorPage__error'>{ errorContent } </div>
      <Anchor href={ href } className='ErrorPage__redirect-anchor'>
        { anchorContent }
      </Anchor>
    </div>
  );
};

ErrorPage.propTypes = {
  referrer: T.string.isRequired,
  url: T.string.isRequired,
  status: T.number.isRequired,
};

export default ErrorPage;
