import { useEffect, useState, useRef } from "react";

import { Text, HStack, View, Image,Heading } from "native-base";
import { Dimensions, SafeAreaView, SectionListProps , SectionList , Platform } from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  Easing,
  useSharedValue,
  interpolate,
  Extrapolate,
  withTiming,
  useAnimatedScrollHandler,
  FadeIn,
} from "react-native-reanimated";

import { ImageSourcePropType } from "react-native";

import { Header } from "@components/Header";

import { Input } from "@components/Input";
import { SectionListItem } from "@components/SectionListItem";
import { FlatListItem } from "@components/FlatListItem";

import { CoffeeCategories } from "@components/CoffeeCategories";
import coffeeBeans from "@assets/coffeeBeans.png";
import { sectionList_DATA } from "@src/utils/coffeeData";
import { flatList_DATA } from "@src/utils/coffeeData";
import { categories  } from "@src/utils/coffeeData";
import  { CoffeeType } from "@src/utils/coffeeData";
import { useNavigation } from "@react-navigation/native";
import { IRoutesNavigationParams } from '@routes/app.routes';

const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);

const AnimatedSectionList =
  Animated.createAnimatedComponent<SectionListProps<coffeeType, coffeeTypeSL>>(SectionList);

  // override imgSrc type
type coffeeType = CoffeeType & {
  imgSrc: ImageSourcePropType;
};

type coffeeTypeSL = {
  category: string;
  data: coffeeType[];
};


export const Home = () => {
  const [textSearchValue, setTextSearchValue] = useState("");
  const [coffeeSectionList, setCoffeeSectionList] =
    useState<coffeeTypeSL[]>(sectionList_DATA);
  const [coffeeFlatList, setCoffeeFlatList] =
    useState<coffeeType[]>(flatList_DATA);
  const [selectedCategory, setSelectedCategory] = useState("");


  const { navigate} = useNavigation<IRoutesNavigationParams>();

  const showProductDetails =( id: string)=>{
    navigate('productScreen', { coffeeId: Number(id)} )
  };

  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const moveHorizontal = useSharedValue(0);

  const sectionListRef = useRef<SectionList<coffeeType, coffeeTypeSL>>(null);



  const AnimatedDivisorLine = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [200, 450], [0, 1]),
    };
  });

  const CARD_WIDTH = 208;
  const gap = Dimensions.get("window").width / 2;

  const handleSearchTextValue = (text: string) => {
      setTextSearchValue(text);

  };


  const AnimatedFTList = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            moveHorizontal.value,
            [0, 1],
            [CARD_WIDTH + gap, 0],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const handleFlatListScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleSectionListScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;

    },
  });

  const handleCategorySelectionAndSectionListScroll = (
    category: string,
    index: number
  ) => {
    setSelectedCategory(category);

      if(sectionListRef.current)
      sectionListRef.current.scrollToLocation({
        itemIndex: 0,
        animated: true,
        sectionIndex: index
    });

  };

 
  useEffect(() => {
    moveHorizontal.value = withTiming(1, {
      duration: 700,
      easing: Easing.ease,
    });
  }, []);

  return (
    <>
      <AnimatedSafeArea style={[{ backgroundColor: "#272221" }]} />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#272221" }}>
        <View 
            flex={1} 
            pb={12}
            pt={Platform.OS === 'android'? 10: 6 } 
            >
          <Header
            scrollY={scrollY}
            leftIcon="map-marker-alt"
            title="Elizabeth, NJ"
            rightIcon="cart"
            size="5"
          />

          <Animated.View>
            <AnimatedSectionList
              ref={sectionListRef}
              initialScrollIndex={0}
              onScroll={handleSectionListScroll}
              bounces={false}
              decelerationRate={0}
              scrollEventThrottle={16}
              contentContainerStyle={{ backgroundColor: "#FAFAFA" }}
              sections={coffeeSectionList}
              stickySectionHeadersEnabled={false}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => String(item.id)}
              ItemSeparatorComponent={() => <View style={{ padding: 10 }} />}
              renderSectionHeader={({ section: { category } }) => (
                <>
                  <Animated.View
                    style={[
                      {
                        height: 0.4,
                        backgroundColor: "#D7D5D5",
                        marginBottom: 20,
                      },
                      AnimatedDivisorLine,
                    ]}
                  />
                  <Animated.View
                    style={{ paddingHorizontal: 32 }}
                    entering={FadeInDown.duration(700)}
                  >
                    <Text
                      fontFamily="baloo2_bold"
                      fontSize="title_Xs"
                      color="base.gray400"
                    >
                      {category}
                    </Text>
                  </Animated.View>
                </>
              )}
              ListHeaderComponent={() => (
                <>
                  <Animated.View
                    entering={FadeInUp.duration(500)}
                    style={[{ backgroundColor: "#272221" }]}
                  >
                    <View px={8}>
                      <Text
                        fontFamily="baloo2_bold"
                        fontSize="title_Md"
                        color="base.gray900"
                        mt={4}
                      >
                        Find the perfect coffee any time of the day.
                      </Text>

                      <Input
                        value={textSearchValue}
                        onChangeText={handleSearchTextValue}
                        zIndex={1}
                        px={4}
                        search={handleSearchTextValue}
               
                      />
                      <View pb={48} ml={2}>
                        <Image
                          position="absolute"
                          right="-25"
                          top="-1"
                          source={coffeeBeans}
                          alt="Coffee Beans"
                          width="83"
                          height="83"
                          resizeMode="cover"
                        />
                      </View>
                    </View>
                  </Animated.View>

                  <Animated.View
                    style={[
                      {
                        zIndex: 2,
                        marginTop: -200,
                        alignItems: "center",
                        marginLeft: 36,
                      },
                      AnimatedFTList,
                    ]}
                  >
                    <Animated.FlatList
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      data={coffeeFlatList}
                      contentContainerStyle={{ paddingHorizontal: 12 }}
                      renderItem={({ item, index }) => (
                        <FlatListItem
                          label={item.label}
                          title={item.title}
                          description={item.description}
                          image={item.imgSrc}
                          price={item.price}
                          scrollX={scrollX}
                          cardSize={CARD_WIDTH}
                          index={index}
                          onPress={()=>showProductDetails(String(item.id))}
                        />
                      )}
                      bounces={false}
                      decelerationRate={0}
                      scrollEventThrottle={16}
                      onScroll={handleFlatListScroll}
                      snapToInterval={10}
                    />
                  </Animated.View>

                  <Animated.View
                    entering={FadeIn.duration(800)}
                    style={[{ paddingHorizontal: 32, marginTop: -50 }]}
                  >
                    <Heading
                      color="base.gray300"
                      fontFamily="baloo2_bold"
                      fontSize="title_Md"
                      mb={2}
                    >
                      Our Coffees
                    </Heading>

                    <HStack mt={2} mb={5}>
                      {categories.map((category, index) => (
                        <CoffeeCategories
                          key={index}
                          category={category}
                          onPress={() =>
                            handleCategorySelectionAndSectionListScroll(
                              category,
                              index
                            )
                          }
                          active={selectedCategory === category}
                        />
                      ))}
                    </HStack>
                  </Animated.View>
                </>
              )}
              SectionSeparatorComponent={() => (
                <View
                  style={{
                    paddingHorizontal: 24,
                    paddingVertical: 16,
                    backgroundColor: "#FAFAFA",
                  }}
                />
              )}
              renderItem={({ item }) => (
                <Animated.View
                  style={[{ paddingHorizontal: 24 }]}
                  entering={FadeInDown.duration(700).easing(Easing.bounce)}
                >
                  <SectionListItem
                    onPress={()=>showProductDetails(String(item.id))}
                    image={item.imgSrc}
                    title={item.title}
                    description={item.description}
                    price={item.price}
                  />
                </Animated.View>
              )}
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
};
