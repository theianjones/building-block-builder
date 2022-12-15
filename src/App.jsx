import React, { useState } from 'react';
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

import './styles.css';

const Block = ({ block, selected, ...props }) => {
  return (
    <Draggable key={block.id}>
      <Box
        position="relative"
        className={cx({ dots: selected })}
        w={`${block.width}px`}
        h={`${block.height}px`}
        borderRadius={'25px'}
        backgroundColor={block.color}
        {...props}
      >
        {selected && (
          <Box
            position="absolute"
            left={block.width - 19}
            bottom={block.height - 19}
            color={block.color}
          >
            <Button
              className="bottom-right-btn"
              style={{
                right: 50 - block.width,
                top: block.height - 40,
              }}
            >
              click me
            </Button>
          </Box>
        )}

        {/* <Box
          position="absolute"
          left={block.width - 19}
          bottom={block.height - 19}
          color={block.color}
        >
          <Hinge className="rotate" />
        </Box>
        <Box
          position="absolute"
          right={block.width - 19}
          bottom={block.height - 19}
          color={block.color}
        >
          <Hinge />
        </Box>
        <Box
          position="absolute"
          right={block.width - 18}
          top={block.height - 18}
          color={block.color}
        >
          <Hinge className="rotate" />
        </Box>
        <Box
          position="absolute"
          left={block.width - 18}
          top={block.height - 18}
          color={block.color}
        >
          <Hinge />
        </Box> */}
      </Box>
    </Draggable>
  );
};

const SizeInput = ({ defaultValue, ...props }) => {
  return (
    <NumberInput step={50} defaultValue={defaultValue} min={0} {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [selected, setSelected] = useState();
  console.log(blocks, selected);
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
          {selected && (
            <Box display="flex" flexDirection="column" gap="16px">
              <FormLabel>
                Height:
                <SizeInput
                  onChange={(newValue) => {
                    const oldBlock = blocks.find(
                      (block) => block.id === selected.id
                    );
                    const newBlock = { ...oldBlock, height: newValue };
                    const newBlocks = blocks.map((block) => {
                      if (block.id !== selected.id) {
                        return block;
                      }

                      return newBlock;
                    });

                    setBlocks(newBlocks);
                  }}
                  defaultValue={selected.height}
                ></SizeInput>
              </FormLabel>
              <FormLabel>
                Width:
                <SizeInput
                  onChange={(newValue) => {
                    const oldBlock = blocks.find(
                      (block) => block.id === selected.id
                    );
                    const newBlock = { ...oldBlock, width: newValue };
                    const newBlocks = blocks.map((block) => {
                      if (block.id !== oldBlock.id) {
                        return block;
                      }

                      return newBlock;
                    });

                    setBlocks(newBlocks);
                  }}
                  defaultValue={selected.width}
                ></SizeInput>
              </FormLabel>
            </Box>
          )}
        </Box>
        <div>
          {blocks.map((block) => {
            return (
              <Block
                key={block.id}
                block={block}
                selected={selected?.id === block.id}
                onDoubleClick={() => {
                  if (selected?.id === block.id) {
                    setSelected();
                  } else {
                    setSelected(block);
                  }
                }}
              />
            );
          })}
        </div>
      </Flex>
    </Container>
  );
};

export default App;
