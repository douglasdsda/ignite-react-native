import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Sheduling } from "../screens/Sheduling";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { CarDetails } from "../screens/CarDetails";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes() {
  return (
    <Navigator headerMode="none">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Sheduling" component={Sheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
