import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Box, BoxProps, Stack } from "@auspices/eos";
import { FileUpload } from "../../components/FileUpload";
import {
  useFilesUploaderQuery,
  SupportedUpload,
  PresignedUrlAttributes,
} from "../../generated/graphql";

export const FILES_UPLOADER_QUERY = gql`
  query FilesUploaderQuery($uploads: [PresignedUrlAttributes!]!) {
    presigned_upload_urls(uploads: $uploads)
  }
`;

export const SUPPORTED_UPLOAD_TYPES = {
  "image/jpeg": "JPEG",
  "image/gif": "GIF",
  "image/png": "PNG",
} as const;

export const ACCEPT = Object.keys(SUPPORTED_UPLOAD_TYPES).join(",");

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
  slug: string;
  files: File[];
  onUpload(params: { url: string; file: File }): void;
};

export const FilesUploader: React.FC<FilesUploaderProps> = ({
  slug,
  files,
  onUpload,
  ...rest
}) => {
  const uploads: PresignedUrlAttributes[] = files.map((file) => ({
    key: `images/${slug}`,
    type: SUPPORTED_UPLOAD_TYPES[
      file.type as keyof typeof SUPPORTED_UPLOAD_TYPES
    ] as SupportedUpload,
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
