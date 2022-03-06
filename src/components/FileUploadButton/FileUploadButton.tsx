import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { FilesUploader } from "../FilesUploader";
import {
  Box,
  boxMixin,
  BUTTON,
  buttonFocusMixin,
  buttonMixin,
  Modal,
  Tooltip,
  useAlerts,
} from "@auspices/eos";

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:focus + label {
    ${buttonFocusMixin}
  }
`;

const Upload = styled.label.attrs({ ...BUTTON })`
  ${boxMixin}
  ${buttonMixin}
  cursor: pointer;
`;

type FileUploadButtonProps = {
  id: string;
  onUpload(url: string): Promise<any>;
  onComplete?(): void;
  fileKey: string;
};

export const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  id,
  children,
  onUpload,
  onComplete,
  fileKey,
  ...rest
}) => {
  const { sendNotification, sendError } = useAlerts();

  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFIles] = useState<File[]>([]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAcceptedFiles([...(event.target.files ?? [])]);
      setUploadingFIles([...(event.target.files ?? [])]);
    },
    []
  );

  const handleUpload = useCallback(
    async ({ url, file }: { url: string; file: File }) => {
      try {
        onUpload(url);
      } catch (err) {
        sendError({ body: (err as Error).message });
      }

      const filename = file.name.substring(
        file.name.length - 15,
        file.name.length
      );

      sendNotification({ body: `${filename} added successfully` });

      setUploadingFIles((prevUploadingFiles) => {
        return prevUploadingFiles.filter(
          (prevFile) => prevFile.name !== file.name
        );
      });
    },
    [onUpload, sendError, sendNotification]
  );

  return (
    <>
      <Tooltip label="Click to add files" placement="bottom" distance={10}>
        <Box display="flex" height="auto">
          <FileInput
            id={id}
            type="file"
            accept="*/*"
            onChange={handleChange}
            multiple
          />

          <Upload
            // @ts-ignore
            for={id}
            flex="1"
            {...rest}
          >
            {children}
          </Upload>
        </Box>
      </Tooltip>

      {uploadingFiles.length > 0 && (
        <Modal overlay zIndex={100}>
          <FilesUploader
            fileKey={fileKey}
            files={acceptedFiles}
            onUpload={handleUpload}
          />
        </Modal>
      )}
    </>
  );
};
