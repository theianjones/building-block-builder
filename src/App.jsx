import React, { useMemo, useState } from 'react';
import cx from 'classnames';
import Draggable from 'react-draggable';
import { v4 as uuidv4 } from 'uuid';
import {
  Box,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
  Container,
} from '@chakra-ui/react';
import { ReactComponent as Hinge } from './assets/hinge.svg';
import Modal from './Modal';

import './styles.css';

const BaseBlock = ({
  block,
  selectedBlock,
  hingeBottomLeft,
  hingeBottomRight,
  hingeTopRight,
  hingeTopLeft,
  setSelected,
  ...props
}) => {
  const [hingeActivated, setHingeActivated] = useState({
    topRight: false,
    topLeft: false,
    bottomRight: false,
    bottomLeft: false,
  });

  const [size, setSize] = useState({
    height: 50,
    width: 50,
  });

  const topRightId = useMemo(() => uuidv4(), []);
  const topLeftId = useMemo(() => uuidv4(), []);
  const bottomRightId = useMemo(() => uuidv4(), []);
  const bottomLeftId = useMemo(() => uuidv4(), []);

  return (
    <Box
      onDoubleClick={(e) => {
        e.stopPropagation();
        console.log(block.id);
        if (selectedBlock?.id === block.id) {
          setSelected();
        } else {
          setSelected(block);
        }
      }}
      position="relative"
      w={`${size.width}px`}
      h={`${size.height}px`}
      borderTopRightRadius={
        hingeTopRight || hingeActivated.topRight ? '0' : '25px'
      }
      borderTopLeftRadius={
        hingeTopLeft || hingeActivated.topLeft ? '0' : '25px'
      }
      borderBottomRightRadius={
        hingeBottomRight || hingeActivated.bottomRight ? '0' : '25px'
      }
      borderBottomLeftRadius={
        hingeBottomLeft || hingeActivated.bottomLeft ? '0' : '25px'
      }
      backgroundColor={block.color}
      {...props}
    >
      {selectedBlock?.id === block.id && (
        <>
          <Modal>
            <Box
              display="flex"
              flexDirection="column"
              gap="16px"
              position="absolute"
              zIndex="1"
              top="50"
              left="15"
              backgroundColor="secondary"
              p="6"
              borderRadius="5"
              opacity=".8"
            >
              <FormLabel>
                Height:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, height: newValue });
                  }}
                  defaultValue={size.height}
                ></SizeInput>
              </FormLabel>
              <FormLabel>
                Width:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, width: newValue });
                  }}
                  defaultValue={size.width}
                ></SizeInput>
              </FormLabel>
            </Box>
          </Modal>
          {!hingeActivated.topRight && !hingeTopRight && (
            <Box
              position="absolute"
              left={size.width - 14}
              bottom={size.height - 14}
              color={block.color}
              backgroundColor="primary"
              w="15px"
              h="15px"
              borderRadius="100px"
              cursor="pointer"
              as={Button}
              onClick={() => {
                setHingeActivated({ ...hingeActivated, topRight: true });
              }}
            ></Box>
          )}
          {!hingeActivated.topLeft && !hingeTopLeft && (
            <Box
              position="absolute"
              right={size.width - 14}
              bottom={size.height - 14}
              color={block.color}
              backgroundColor="primary"
              w="15px"
              h="15px"
              borderRadius="100px"
              cursor="pointer"
              as={Button}
              onClick={() => {
                setHingeActivated({ ...hingeActivated, topLeft: true });
              }}
            ></Box>
          )}
          {!hingeActivated.bottomRight && !hingeBottomRight && (
            <Box
              position="absolute"
              left={size.width - 14}
              top={size.height - 14}
              color={block.color}
              backgroundColor="primary"
              w="15px"
              h="15px"
              borderRadius="100px"
              cursor="pointer"
              as={Button}
              onClick={() => {
                setHingeActivated({ ...hingeActivated, bottomRight: true });
              }}
            ></Box>
          )}
          {!hingeActivated.bottomLeft && !hingeBottomLeft && (
            <Box
              position="absolute"
              right={size.width - 14}
              top={size.height - 14}
              color={block.color}
              backgroundColor="primary"
              w="15px"
              h="15px"
              borderRadius="100px"
              cursor="pointer"
              as={Button}
              onClick={() => {
                setHingeActivated({ ...hingeActivated, bottomLeft: true });
              }}
            ></Box>
          )}
        </>
      )}

      {hingeActivated.topRight && (
        <>
          <Box position="absolute" left={size.width} bottom={size.height}>
            <BaseBlock
              block={{
                id: topRightId,
                color: 'black',
              }}
              hingeBottomLeft
              selectedBlock={selectedBlock}
              setSelected={setSelected}
            />
          </Box>
          <Box
            position="absolute"
            left={size.width - 19}
            bottom={size.height - 19}
            color={block.color}
          >
            <Hinge className="rotate" />
          </Box>
        </>
      )}
      {hingeActivated.topLeft && (
        <>
          <Box position="absolute" right={size.width} bottom={size.height}>
            <BaseBlock
              block={{
                id: topLeftId,
                color: 'black',
              }}
              hingeBottomRight
              selectedBlock={selectedBlock}
              setSelected={setSelected}
            />
          </Box>
          <Box
            position="absolute"
            right={size.width - 19}
            bottom={size.height - 19}
            color={block.color}
          >
            <Hinge />
          </Box>
        </>
      )}
      {hingeActivated.bottomLeft && (
        <>
          <Box position="absolute" right={size.width} top={size.height}>
            <BaseBlock
              block={{
                id: bottomLeftId,
                color: 'black',
              }}
              hingeTopRight
              selectedBlock={selectedBlock}
              setSelected={setSelected}
            />
          </Box>
          <Box
            position="absolute"
            right={size.width - 18}
            top={size.height - 18}
            color={block.color}
          >
            <Hinge className="rotate" />
          </Box>
        </>
      )}
      {hingeActivated.bottomRight && (
        <>
          <Box position="absolute" left={size.width} top={size.height}>
            <BaseBlock
              block={{
                id: bottomRightId,
                color: 'black',
                height: 50,
                width: 50,
              }}
              hingeTopLeft
              selectedBlock={selectedBlock}
              setSelected={setSelected}
            />
          </Box>
          <Box
            position="absolute"
            left={size.width - 18}
            top={size.height - 18}
            color={block.color}
          >
            <Hinge />
          </Box>
        </>
      )}
    </Box>
  );
};

const RootBlock = ({ block, selectedBlock, setSelected, ...props }) => {
  return (
    <Draggable key={block.id}>
      <BaseBlock
        block={block}
        selectedBlock={selectedBlock}
        setSelected={setSelected}
        {...props}
      />
    </Draggable>
  );
};

const SizeInput = ({ defaultValue, ...props }) => {
  return (
    <NumberInput step={50} defaultValue={defaultValue} min={50} {...props}>
      <NumberInputField
        css={`padding: 10px;
      border-radius: 5px;
      
      `}
      />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelected] = useState();
  return (
    <Container px="10">
      <Flex direction="row" gap="16">
        <Box as="aside" w={300} bgColor={'gray.300'}>
          <Button
            bgColor="primary"
            padding={10}
            borderRadius={5}
            onClick={() => {
              setBlocks(
                blocks.concat({
                  id: uuidv4(),
                  color: 'black',
                  height: 50,
                  width: 50,
                })
              );
            }}
          >
            Add Block
          </Button>
        </Box>
        <div>
          {blocks.map((block) => {
            return (
              <RootBlock
                key={block.id}
                block={block}
                selectedBlock={selectedBlock}
                setSelected={setSelected}
              />
            );
          })}
        </div>
      </Flex>
    </Container>
  );
};

export default App;
