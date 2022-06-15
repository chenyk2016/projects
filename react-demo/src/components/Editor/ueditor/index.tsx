import React, { useEffect } from 'react';
import { Button, Modal } from 'antd';
import styles from './index.scss';

declare const PUBLICPATH: string;

declare global {
  interface Window {
    UE: any;
  }
}

interface Props {
  id: string;
  value?: string;
  onchange?: any;
}

const ue: any = {};

const Ueditor = React.memo((props: Props) => {
  const { id, value, onchange } = props;

  const deleteEditor = (id: string) => {
    window.UE && window.UE.delEditor(id);
    delete ue[id];
  };

  useEffect(() => {
    deleteEditor(id);
    ue[id] =
      window.UE &&
      window.UE.getEditor &&
      window.UE.getEditor(id, {
        UEDITOR_HOME_URL: PUBLICPATH + 'ueditor/',
        initialFrameWidth: 800,
        serverUrl: '/ue/upload',
        allowDivTransToP: false,
        autoHeightEnabled: false,
      });
    return (): void => {
      deleteEditor(id);
      const textArea = document.getElementById(id);
      textArea.remove();
    };
  }, [id]);

  useEffect(() => {
    ue[id] &&
      ue[id].ready(() => {
        if (!ue[id]) return;
        if (value) {
          ue[id].setContent(value);
        }
        ue[id].addListener('contentChange', function() {
          if (onchange) {
            onchange(this.getContent());
          }
        });
      });
  }, [id, onchange, value]);

  const onPreview = (): void => {
    const content = ue[id].getContent();
    Modal.info({
      maskClosable: true,
      centered: true,
      title: '预览',
      content: (
        <div
          className={styles.previewBox}
          style={{
            height: '580px',
            overflow: 'scroll',
            marginTop: '20px',
            marginLeft: '-38px',
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      ),
    });
  };

  return (
    <div>
      <script id={id} />
      <div style={{ margin: '10px 0' }}>
        <Button type="primary" onClick={onPreview}>
          预览
        </Button>
      </div>
    </div>
  );
});

export default Ueditor;
