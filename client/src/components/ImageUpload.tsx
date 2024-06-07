"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Center,
  Image,
  Input,
  ScaleFade,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ImageUpload({
  size = "100px",
  rounded = "full",
  onUpdateFile,
  multiple,
}: {
  size?: string;
  rounded?: string;
  onUpdateFile: (file: File[]) => void;
  multiple: boolean;
}) {
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    setUploadedFile(files);
    onUpdateFile(files);
  };

  return (
    <Center
      w={size}
      h={size}
      as={chakra.label}
      htmlFor="files"
      bg="whiteAlpha.500"
      border="1px dashed gray"
      rounded={rounded}
      cursor="pointer"
      overflow="hidden"
      position="relative"
    >
      <Center
        position="absolute"
        w="100%"
        h="100%"
        _hover={{ bg: "blackAlpha.600" }}
      >
        <VStack>
          <AddIcon />
          <Text>Upload</Text>
        </VStack>
      </Center>

      {uploadedFile && (
        <ScaleFade initialScale={0.9} in={uploadedFile !== null}>
          <Image
            w="100%"
            h={"100%"}
            src={URL.createObjectURL(uploadedFile[0])}
            alt="Uploaded"
            rounded={rounded}
          />
        </ScaleFade>
      )}

      <Input
        required
        style={{ display: "none" }}
        type="file"
        multiple={multiple}
        id="files"
        name="files"
        onChange={handleFileChange}
      />
    </Center>
  );
}
