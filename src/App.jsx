import React, {
  createContext,
  useMemo,
  useState,
  useContext,
  Provider,
  useRef,
} from 'react';
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
  VStack,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Slider,
  SliderMark,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Badge,
  HStack,
  Wrap,
} from '@chakra-ui/react';
import { ReactComponent as Hinge } from './assets/hinge.svg';
import { ReactComponent as Logo } from './assets/logo.svg';
import Modal from './Modal';
import { documentToSVG, elementToSVG, inlineResources } from 'dom-to-svg';
import { toSvg } from 'html-to-image';

import './styles.css';

const RootBlockContext = createContext();

const exportBlock = async (exportType, blockRef, block, exportSize) => {
  function filter(node) {
    return node.tagName !== 'BUTTON';
  }

  switch (exportType) {
    case 'svg': {
      toSvg(blockRef.current, {
        filter: filter,
        width: exportSize.width,
        height: exportSize.height,
      }).then(function (dataUrl) {
        console.log(blockRef.current);
        console.log(dataUrl);
        const link = document.createElement('a');
        link.download = `building-block-builder-${block.id}.svg`;
        link.href = dataUrl;
        link.click();
      });
      break;
    }
    default:
      throw new Error(`${exportType} not supported`);
  }
};

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

  const { rootBlock, rootBlockRef, exportSize, setExportSize } =
    useContext(RootBlockContext);

  const topRightId = useMemo(() => uuidv4(), []);
  const topLeftId = useMemo(() => uuidv4(), []);
  const bottomRightId = useMemo(() => uuidv4(), []);
  const bottomLeftId = useMemo(() => uuidv4(), []);

  return (
    <Box
      id={block.id}
      onDoubleClick={(e) => {
        e.stopPropagation();
        console.log(e);
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
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <FormLabel>
                Height:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, height: newValue });
                    setExportSize({
                      ...exportSize,
                      height: exportSize.height + (newValue - size.height),
                    });
                  }}
                  defaultValue={size.height}
                ></SizeInput>
              </FormLabel>
              <FormLabel>
                Width:
                <SizeInput
                  onChange={(newValue) => {
                    setSize({ ...size, width: newValue });
                    setExportSize({
                      ...exportSize,
                      width: exportSize.width + (newValue - size.width),
                    });
                  }}
                  defaultValue={size.width}
                ></SizeInput>
              </FormLabel>
              <Button
                onClick={() =>
                  exportBlock('svg', rootBlockRef, rootBlock, exportSize)
                }
              >
                Export Block as Svg
              </Button>
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
                setExportSize({
                  width: exportSize.width + 50,
                  height: exportSize.height + 50,
                });
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
                setExportSize({
                  width: exportSize.width + 50,
                  height: exportSize.height + 50,
                });
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
                setExportSize({
                  width: exportSize.width + 50,
                  height: exportSize.height + 50,
                });
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
                setExportSize({
                  width: exportSize.width + 50,
                  height: exportSize.height + 50,
                });
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
  const rootBlockRef = useRef();
  const [exportSize, setExportSize] = useState({
    width: block.width,
    height: block.height,
  });
  return (
    <RootBlockContext.Provider
      value={{ rootBlock: block, rootBlockRef, exportSize, setExportSize }}
    >
      {/* <Draggable key={block.id}> */}
      <div ref={rootBlockRef} key={block.id}>
        <BaseBlock
          block={block}
          selectedBlock={selectedBlock}
          setSelected={setSelected}
          {...props}
        />
      </div>
      {/* </Draggable> */}
    </RootBlockContext.Provider>
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

  const [sliderValue, setSliderValue] = useState(50);

  const labelStyles = {
    mt: '2',
    ml: '-2.5',
    fontSize: 'sm',
  };

  return (
    <Container px="10">
      <Flex direction="row" gap="16px" alignItems="start">
        <VStack align="left" alignItems="left">
          <Card>
            <CardBody alignContent="center">
              <Logo />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h1>Building Block Builder</h1>
            </CardHeader>
            <CardBody>
              <text>
                Welcome to the Splash building block builder tool. Click the
                “Add” button to begin. From there follow work instinctively by
                clicking corners of your building block to add new ones. Change
                the sizes with sliders, delete and combine blocks, etc.
              </text>
            </CardBody>
            <CardFooter>
              <text>
                Version 1.0 / Ian Jones, Ian Petty, Ben Palin & Dante Pantalone
                / 2022 Hackathon
              </text>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>Create Blocks</CardHeader>
            <CardBody>
              <Button
                variant="outline"
                padding={'8px 16px'}
                border={'1px solid #000'}
                borderRadius={100}
                marginRight={4}
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
              <Button
                variant="outline"
                padding={'8px 16px'}
                border={'1px solid #000'}
                borderRadius={100}
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
                Delete Block
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <text>Size</text>
            </CardHeader>
            <CardBody>
              <Badge variant="brandPrimary">Vertical</Badge>
              <Slider defaultValue={50} min={0} max={500} step={50}>
                <SliderTrack bg="black">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="black" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
              <Badge variant="brandPrimary">Horizontal</Badge>
              <Slider defaultValue={50} min={0} max={500} step={50}>
                <SliderTrack bg="black">
                  <Box position="relative" right={10} />
                  <SliderFilledTrack bg="black" />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>Create Blocks</CardHeader>
            <CardBody>
              <Wrap>
                <Button
                  width="44%"
                  backgroundColor="accent"
                  padding={'8px 16px'}
                  border={'1px solid #000'}
                  borderRadius={100}
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
                ></Button>
                <Button
                  width="25%"
                  backgroundColor="primary"
                  padding={'8px 16px'}
                  border={'1px solid #000'}
                  borderRadius={100}
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
                ></Button>
                <Button
                  width="25%"
                  backgroundColor="secondary"
                  padding={'8px 16px'}
                  border={'1px solid #000'}
                  borderRadius={100}
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
                ></Button>
                <Button
                  width="100%"
                  backgroundColor="white"
                  padding={'8px 16px'}
                  border={'1px solid #000'}
                  borderRadius={100}
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
                ></Button>
                <Button
                  width="100%"
                  backgroundColor="black"
                  padding={'8px 16px'}
                  border={'1px solid #000'}
                  borderRadius={100}
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
                ></Button>
              </Wrap>
            </CardBody>
          </Card>
        </VStack>
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
