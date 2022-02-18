import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Box, BoxProps, Stack } from "@auspices/eos";
import { FileUpload } from "../../components/FileUpload";
import {
  useFilesUploaderQuery,
  PresignedUrlAttributes,
} from "../../generated/graphql";

gql`
  query FilesUploaderQuery($uploads: [PresignedUrlAttributes!]!) {
    presigned_upload_urls(uploads: $uploads)
  }
`;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100vw;
  height: 100vh;
`;

const List = styled(Box).attrs({
  p: 6,
})`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export type FilesUploaderProps = BoxProps & {
  fileKey: string;
  files: File[];
  onUpload(params: { url: string; file: File }): void;
};

export const FilesUploader: React.FC<FilesUploaderProps> = ({
  fileKey,
  files,
  onUpload,
  ...rest
}) => {
  const uploads: PresignedUrlAttributes[] = files.map((file) => ({
    fileKey: `${fileKey}/${file.name}`,
    fileType: file.type,
  }));

  const [{ data, error, fetching }] = useFilesUploaderQuery({
    variables: { uploads },
  });

  if (error) {
    throw error;
  }

  if (fetching || !data) return null;

  return (
    <Container {...rest}>
      <List>
        <Stack>
          {data.presigned_upload_urls.map((presignedUploadUrl, i) => {
            const file = files[i];

            return (
              <FileUpload
                key={file.name + i}
                file={file}
                presignedUploadUrl={presignedUploadUrl}
                onUpload={onUpload}
              />
            );
          })}
        </Stack>
      </List>
    </Container>
  );
};
