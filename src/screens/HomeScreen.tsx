import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Card} from '../components/ui';
import {useFadeIn} from '../hooks/useFadeIn';
import {COLORS, TYPOGRAPHY, SPACING, LAYOUT, BRAND, IS_IPAD} from '../config/theme';

const {width} = Dimensions.get('window');

// Mock data for demonstration
const recentClients = [
  {id: '1', name: 'Sarah Martinez', lastService: 'Jan 10', avatar: 'SM'},
  {id: '2', name: 'Emily Johnson', lastService: 'Jan 12', avatar: 'EJ'},
  {id: '3', name: 'Jessica Chen', lastService: 'Jan 14', avatar: 'JC'},
];

const todaysStats = {
  consultations: 12,
  bookings: 8,
  conversionRate: 67,
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useFadeIn(500, 200);

  const goToConsultation = () => {
    navigation.navigate('Consultation' as never);
  };

  const goToLibrary = () => {
    // Navigate to formula library
  };

  const goToClients = () => {
    // Navigate to client database
  };

  const goToAnalytics = () => {
    // Navigate to analytics
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>{BRAND.name}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
          <View style={styles.profilePic}>
            <Text style={styles.profileText}>LS</Text>
          </View>
        </View>
      </View>

      <Animated.ScrollView
        style={[styles.scrollView, {opacity: fadeAnim}]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section - New Consultation Button */}
        <View style={styles.heroSection}>
          <Button
            title="+ NEW CONSULTATION"
            onPress={goToConsultation}
            style={styles.newConsultationButton}
            textStyle={styles.newConsultationText}
          />
        </View>

        {/* Recent Clients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Clients</Text>
          <View style={styles.clientsGrid}>
            {recentClients.map((client) => (
              <TouchableOpacity key={client.id} style={styles.clientCard}>
                <View style={styles.clientAvatar}>
                  <Text style={styles.avatarText}>{client.avatar}</Text>
                </View>
                <Text style={styles.clientName}>{client.name}</Text>
                <Text style={styles.clientDate}>{client.lastService}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Performance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Performance</Text>
          <View style={styles.statsGrid}>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>{todaysStats.consultations}</Text>
              <Text style={styles.statLabel}>Consultations</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>{todaysStats.bookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </Card>
            <Card style={styles.statCard}>
              <Text style={styles.statNumber}>{todaysStats.conversionRate}%</Text>
              <Text style={styles.statLabel}>Conversion</Text>
            </Card>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickAction} onPress={goToLibrary}>
              <Text style={styles.quickActionIcon}>📚</Text>
              <Text style={styles.quickActionText}>Formula Library</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={goToClients}>
              <Text style={styles.quickActionIcon}>👥</Text>
              <Text style={styles.quickActionText}>Clients</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction} onPress={goToAnalytics}>
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softCream,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: LAYOUT.screenPadding,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.pureWhite,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  logo: {
    ...BRAND.logo,
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.softCream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.champagneGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: COLORS.pureWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPadding,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: LAYOUT.sectionSpacing,
  },
  newConsultationButton: {
    width: IS_IPAD ? width * 0.6 : width * 0.8,
    height: 80,
    borderRadius: LAYOUT.borderRadius.lg,
    ...LAYOUT.shadow.heavy,
  },
  newConsultationText: {
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.lg,
  },
  clientsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  clientCard: {
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    minWidth: IS_IPAD ? 120 : 100,
    ...LAYOUT.shadow.light,
  },
  clientAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.champagneGold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  avatarText: {
    color: COLORS.pureWhite,
    fontSize: 18,
    fontWeight: '600',
  },
  clientName: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  clientDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.slateGray,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.lg,
  },
  statNumber: {
    ...TYPOGRAPHY.h2,
    color: COLORS.champagneGold,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.slateGray,
    textAlign: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
  },
  quickAction: {
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    minWidth: IS_IPAD ? 140 : 100,
    ...LAYOUT.shadow.light,
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  quickActionText: {
    ...TYPOGRAPHY.small,
    color: COLORS.deepCharcoal,
    textAlign: 'center',
  },
});
