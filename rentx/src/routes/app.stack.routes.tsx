import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Sheduling } from "../screens/Sheduling";
import { Confirmation } from "../screens/Confirmation";
import { CarDetails } from "../screens/CarDetails";
import { MyCars } from "../screens/MyCars";
const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Sheduling" component={Sheduling} />

      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
