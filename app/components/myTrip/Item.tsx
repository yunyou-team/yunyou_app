import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";
import Octicons from "@expo/vector-icons/Octicons";

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};

type TripItemProps = {
  data: ITrips;
  size?: "large" | "default";
};

const screenWidth = Dimensions.get("window").width;

export default function TripItem({ data, size = "default" }: TripItemProps) {
  const { trip, participants } = data;
  const [imageError, setImageError] = React.useState(false);

  return (
    <View style={styles.container}>
      {/* 图片容器 */}
      <View
        style={[
          styles.imageContainer,
          size === "large" && styles.largeImageContainer,
        ]}
      >
        {/* 灰色兜底背景 */}
        <View style={styles.imageFallback} />

        {/* 图片内容 */}
        {trip.coverImage && !imageError ? (
          <Image
            source={{ uri: trip.coverImage }}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>行程封面</Text>
          </View>
        )}
      </View>

      {/* 信息容器 */}
      <View style={styles.infoContainer}>
        {/* 标题 */}
        <Text style={[styles.title, size === "large" && styles.largeTitle]}>
          {trip.tripName}
        </Text>

        {/* 地点信息 */}
        <View style={styles.locationContainer}>
          <Octicons name="location" size={dp2px(12)} color="#9c9c9c" />
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
            {trip.location[trip.location?.length - 1]}
          </Text>
          <Text style={styles.locationText}>
            | 共添加{trip.location.length}个地点
          </Text>
        </View>

        {/* 时间信息 */}
        <View style={styles.metaContainer}>
          <Octicons name="clock" size={dp2px(12)} color="#9c9c9c" />
          <Text style={styles.timeText}>
            {formatDate(trip.tripStartTime)} - {formatDate(trip.tripEndTime)}
          </Text>
        </View>

        {/* 参与者 */}
        <View style={styles.avatarsContainer}>
          {participants
            .slice(0, size === "default" ? 3 : 4)
            .map((user, index) => (
              <Image
                key={user.uid}
                source={{ uri: user.avatar }}
                style={[
                  styles.avatar,
                  {
                    marginLeft: index > 0 ? dp2px(-10) : 0,
                    ...(size === "large" && styles.largeAvatar),
                  },
                ]}
              />
            ))}
          {participants.length > (size === "default" ? 3 : 4) && (
            <View
              style={[
                styles.moreAvatar,
                size === "large" && styles.largeMoreAvatar,
              ]}
            >
              <Text style={styles.moreText}>
                +{participants.length - (size === "default" ? 3 : 4)}
              </Text>
            </View>
          )}
        </View>

        {/* 编辑按钮 */}
        <Image
          source={require("@/assets/images/myTrip/pencil-line.png")}
          style={[styles.editIcon, size === "large" && styles.largeEditIcon]}
        />
      </View>
    </View>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: dp2px(8),
    marginVertical: dp2px(8),
    // backgroundColor: "#FFF",
  },
  imageContainer: {
    width: dp2px(88),
    height: dp2px(88),
    borderRadius: dp2px(8),
    overflow: "hidden",
    marginRight: dp2px(12),
    position: "relative",
  },
  largeImageContainer: {
    width: dp2px(99),
    height: dp2px(123),
    overflow: "hidden",
    position: "relative",
  },
  imageFallback: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F0F0F0",
    zIndex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
    zIndex: 2,
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(240,240,240,0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  placeholderText: {
    color: "#999",
    fontSize: dp2px(12),
    fontWeight: "500",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    position: "relative",
  },
  title: {
    fontSize: dp2px(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: dp2px(6),
  },
  largeTitle: {
    fontSize: dp2px(18),
    marginBottom: dp2px(8),
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: dp2px(6),
    maxWidth: "100%",
  },
  location: {
    fontSize: dp2px(12),
    color: "#9c9c9c",
    marginHorizontal: dp2px(4),
    maxWidth: "60%",
  },
  locationText: {
    fontSize: dp2px(12),
    color: "#9c9c9c",
    flexShrink: 0,
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: dp2px(6),
  },
  timeText: {
    fontSize: dp2px(12),
    color: "#9c9c9c",
    marginLeft: dp2px(4),
  },
  avatarsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: dp2px(8),
  },
  avatar: {
    width: dp2px(24),
    height: dp2px(24),
    borderRadius: dp2px(12),
    borderWidth: dp2px(1),
    borderColor: "#FFF",
  },
  largeAvatar: {
    width: dp2px(28),
    height: dp2px(28),
  },
  moreAvatar: {
    width: dp2px(24),
    height: dp2px(24),
    borderRadius: dp2px(12),
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dp2px(-10),
  },
  largeMoreAvatar: {
    width: dp2px(28),
    height: dp2px(28),
  },
  moreText: {
    fontSize: dp2px(12),
    color: "#FFF",
    fontWeight: "500",
  },
  editIcon: {
    position: "absolute",
    top: "50%",
    right: 0,
    transform: [{ translateY: "-50%" }],
    width: dp2px(16),
    height: dp2px(16),
  },
  largeEditIcon: {
    width: dp2px(20),
    height: dp2px(20),
  },
});
