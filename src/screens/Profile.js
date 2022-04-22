import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Switch, } from 'react-native'
import React from 'react'
import { MainLayout } from './'
import { HeaderBar } from '../components'
import { FONTS, COLORS, SIZES } from '../constants/Theme'
import { allIcon, DummyData } from '../constants'
// this function is used to create section tittle dynamically
const SectionTitle = ({ title }) => {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text style={{ color: COLORS.lightGray3, ...FONTS.h4 }}>{title}</Text>
    </View>
  )
}
// this function is used to create settings sections dynamically
const Settings = ({ title, value, type, onPress }) => {
  if (type == "button") {
    return (
      <TouchableOpacity style={{ flexDirection: "row", height: 50, alignItems: "center" }} onPress={onPress}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>{title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginRight: SIZES.radius, color: COLORS.lightGray3, ...FONTS.h3 }}>{value}</Text>
          <Image
            source={allIcon.rightArrow}
            style={{ height: 15, width: 15, tintColor: COLORS.white }}
          />
        </View>
      </TouchableOpacity>
    )
  }
  else {
    return (
      <View style={{
        flexDirection: "row", height: 50, alignItems: "center"
      }}>
        <Text style={{ flex: 1, color: COLORS.white, ...FONTS.h3 }}>{title}</Text>
        <Switch
          trackColor={{ true: COLORS.lightGreen, false: 'grey' }}
          value={value}
          onValueChange={(value) => onPress(value)}
        />
      </View>
    )
  }
}
const Profile = () => {
  const [faceid, setFaceId] = React.useState(true)
  return (
    <MainLayout>
      <View style={{ flex: 1, paddingHorizontal: SIZES.padding, backgroundColor: COLORS.black }}>
        {/* Header */}
        <HeaderBar title={"Profile"} />
        {/* Details */}
        <ScrollView>
          {/* Email & User id */}
          <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
            {/* Email and ID */}
            <View style={{ flex: 1 }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{DummyData.profile.email}</Text>
              <Text style={{ color: COLORS.lightGray3, ...FONTS.body4 }}>ID:{DummyData.profile.id}</Text>
            </View>
            {/* Status */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={allIcon.verified}
                style={{ height: 25, width: 25, tintColor: COLORS.lightGreen }}
              />
              <Text style={{ marginLeft: SIZES.base, color: COLORS.lightGreen, ...FONTS.body4 }}>Verified</Text>
            </View>
          </View>
          {/* APP */}
          <SectionTitle title={"App"} />
          <Settings
            title="Launch Screen"
            value="Home"
            type="button"
            onPress={() => console.log("ikram")}
          />
          <Settings
            title="Appearance"
            value="Dark"
            type="button"
            onPress={() => console.log("ikram")}
          />
          {/* Account section */}
          <SectionTitle
            title={"ACCOUNT"}
          />
          <Settings
            title="payment Currency"
            value="USD"
            type="button"
            onPress={() => console.log("ikram")}
          />
          <Settings
            title="Language"
            value="English"
            type="button"
            onPress={() => console.log("ikram")}
          />
          <SectionTitle
            title={"SECURITY"}
          />
          <Settings
            title="FaceID"
            value={faceid}
            type="Switch"
            onPress={(value) => setFaceId(value)}
          />
          <Settings
            title="Password Setting"
            value=""
            type="button"
            onPress={() => console.log("ikram")}
          />
          <Settings
            title="Change Password"
            value=""
            type="button"
            onPress={() => console.log("ikram")}
          />
          <Settings
            title="2-Factor Authentication"
            value=""
            type="button"
            onPress={() => console.log("ikram")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  )
}
export default Profile
const styles = StyleSheet.create({})