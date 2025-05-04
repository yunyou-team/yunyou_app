import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createAdaptStyleSheet } from "@/utils";
import { dp2px } from "@/utils/adaptScreen";

const data = {
  trip: {
    tripId: 1,
    tripName: "北京文化探索之旅",
    location: ["北京", "济南"],
    coverImage: null,
    creatorId: 1,
    createdAt: 1745224523599,
    updatedAt: 1745509279373,
  },
  participants: [
    {
      uid: 1,
      avatar:
        "https://sns-avatar-qc.xhscdn.com/avatar/1040g2jo31f11btv1ma004a6tvr94m1oa9era6v8",
    },
    {
      uid: 2,
      avatar:
        "https://sns-avatar-qc.xhscdn.com/avatar/64b6336fcc3d475a91100a0c.jpg",
    },
  ],
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;
};

export default function TripItem() {
  const { trip, participants } = data;

  return (
    <View style={styles.container}>
      {/* 左侧图片容器 */}
      <View style={styles.imageContainer}>
        {trip.coverImage ? (
          <Image source={{ uri: trip.coverImage }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>行程封面</Text>
          </View>
        )}
      </View>

      {/* 右侧信息容器 */}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{trip.tripName}</Text>

        <Text style={styles.location}>{trip.location.join(" → ")}</Text>

        <Text style={styles.metaText}>添加了{trip.location.length}个地点</Text>

        <Text style={styles.metaText}>
          {formatDate(trip.createdAt)} - {formatDate(trip.updatedAt)}
        </Text>

        {/* 参与者头像容器 */}
        <View style={styles.avatarsContainer}>
          {participants.map((user, index) => (
            <Image
              key={user.uid}
              source={{ uri: user.avatar }}
              style={[
                styles.avatar,
                { marginLeft: index > 0 ? dp2px(-10) : 0 },
              ]}
            />
          ))}
          {participants.length > 3 && (
            <View style={styles.moreAvatar}>
              <Text style={styles.moreText}>+{participants.length - 3}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = createAdaptStyleSheet.create({
  container: {
    flexDirection: "row",
    padding: dp2px(16),
    backgroundColor: "#FFFFFF",
    borderRadius: dp2px(8),
    marginVertical: dp2px(8),
  },
  imageContainer: {
    width: dp2px(99),
    height: dp2px(123),
    borderRadius: dp2px(8),
    overflow: "hidden",
    marginRight: dp2px(12),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#999",
    fontSize: dp2px(12),
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: dp2px(16),
    fontWeight: "600",
    color: "#333",
    marginBottom: dp2px(4),
  },
  location: {
    fontSize: dp2px(14),
    color: "#666",
    marginBottom: dp2px(4),
  },
  metaText: {
    fontSize: dp2px(12),
    color: "#999",
    marginBottom: dp2px(4),
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
  moreAvatar: {
    width: dp2px(24),
    height: dp2px(24),
    borderRadius: dp2px(12),
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dp2px(-10),
  },
  moreText: {
    fontSize: dp2px(12),
    color: "#FFF",
  },
});
