"use client";
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
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
  multiple,
  imageFile,
  handleImageUpload,
  imageURL,
}: {
  size?: string;
  rounded?: string;
  multiple: boolean;
  imageFile: File | null;
  handleImageUpload: (file: File[]) => void;
  imageURL: string | null;
}) {
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    console.log(event);
    handleImageUpload(files);
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
      onClick={(e) => {
        if (imageFile) {
          setTimeout(() => {
            handleImageUpload([]);
          }, 100);
        }
      }}
    >
      <Center
        position="absolute"
        w="100%"
        h="100%"
        _hover={{ bg: "blackAlpha.600" }}
      >
        {!imageFile && (
          <VStack>
            <AddIcon />
            <Text>Upload</Text>
          </VStack>
        )}
      </Center>

      {imageFile && (
        <ScaleFade initialScale={0.9} in={imageFile !== null}>
          <Image
            w="100%"
            h={"100%"}
            src={imageURL ? imageURL : ""}
            alt="Uploaded"
            rounded={rounded}
          />
        </ScaleFade>
      )}

      {!imageFile && (
        <Input
          required
          style={{ display: "none" }}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          id="files"
          name="files"
          onChange={handleFileChange}
        />
      )}
    </Center>
  );
}
