import React from 'react';
import ContentLoader from 'react-content-loader';

function SkeletonCard() {
  return (
    <ContentLoader
      speed={2}
      width={271}
      height={366}
      viewBox="0 0 271 366"
      backgroundColor="hsla(0, 0%, 80%, .4)"
      foregroundColor="hsla(0, 0%, 75%, .8)"
    >
      <rect x="0" y="0" rx="9" ry="9" width="271" height="166" />
      <rect x="0" y="155" rx="0" ry="9" width="5" height="200" />
      <rect x="266" y="155" rx="0" ry="9" width="5" height="200" />
      <rect x="0" y="350" rx="0" ry="9" width="271" height="5" />
      <rect x="20" y="190" rx="5" ry="5" width="215" height="25" />
      <rect x="20" y="235" rx="5" ry="5" width="180" height="15" />
      <rect x="20" y="260" rx="5" ry="5" width="140" height="15" />
      <rect x="20" y="285" rx="5" ry="5" width="200" height="15" />
    </ContentLoader>
  );
}

export default SkeletonCard;
