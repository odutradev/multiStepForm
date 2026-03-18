import { useLocation, Navigate } from 'react-router-dom';
import { useRef } from 'react';

import DocumentViewer from './subcomponents/DocumentViewer';
import ActionButtons from './subcomponents/ActionButtons';
import { ViewContainer } from './styles';

const View = () => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const formData = location.state?.formData;

  if (!formData) return <Navigate to="/main" replace />;

  return (
    <ViewContainer>
      <ActionButtons contentRef={contentRef} />
      <DocumentViewer ref={contentRef} data={formData} />
    </ViewContainer>
  );
};

export default View;