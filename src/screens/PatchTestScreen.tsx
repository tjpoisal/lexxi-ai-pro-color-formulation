import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Card} from '../components/ui';
import {COLORS, TYPOGRAPHY, SPACING, LAYOUT} from '../config/theme';

// Mock data
const patchTestReasons = [
  {id: '1', reason: 'First-time client', active: true},
  {id: '2', reason: 'New product line', active: true},
  {id: '3', reason: 'Lightener formula', active: false},
  {id: '4', reason: 'Allergic history', active: false},
];

const products = [
  {id: '1', name: 'Redken Shades EQ 06NB', brand: 'Redken'},
  {id: '2', name: 'Wella Blondor Multi-Blonde', brand: 'Wella'},
  {id: '3', name: 'Wella Color Touch 9/16', brand: 'Wella'},
  {id: '4', name: 'Olaplex No.1', brand: 'Olaplex'},
];

const availableTimes = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
];

export default function PatchTestScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('');

  const handleScheduleAppointment = () => {
    if (!selectedTime) {
      Alert.alert('Select Time', 'Please select an appointment time.');
      return;
    }

    Alert.alert(
      'Appointment Scheduled',
      `Patch test scheduled for ${selectedDate} at ${selectedTime}.\n\nClient will receive SMS reminders.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home' as never),
        },
      ]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getEarliestDate = () => {
    const now = new Date();
    const earliest = new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours from now
    return earliest;
  };

  const getServiceDate = () => {
    const patchTestDate = new Date();
    // Add selected time offset, then add minimum 48 hours
    const serviceDate = new Date(patchTestDate.getTime() + 48 * 60 * 60 * 1000);
    return serviceDate;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Warning Banner */}
        <Card style={styles.warningBanner}>
          <View style={styles.warningHeader}>
            <Text style={styles.warningIcon}>⚠️</Text>
            <Text style={styles.warningTitle}>Patch Test Required</Text>
          </View>
          <Text style={styles.warningText}>
            State law requires a 48-hour patch test before chemical services.
            Schedule now to avoid delays.
          </Text>
        </Card>

        {/* Reasons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Required:</Text>
          <View style={styles.reasonsGrid}>
            {patchTestReasons.map((reason) => (
              <View
                key={reason.id}
                style={[styles.reasonChip, reason.active && styles.reasonChipActive]}
              >
                <Text style={[styles.reasonText, reason.active && styles.reasonTextActive]}>
                  {reason.reason}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products to Test:</Text>
          <View style={styles.productsList}>
            {products.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productBrand}>{product.brand}</Text>
                </View>
                <View style={styles.testIndicator}>
                  <Text style={styles.testText}>Test Required</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Patch Test Date:</Text>
          <Text style={styles.dateNote}>
            Must be at least 48 hours before service date
          </Text>
          <View style={styles.dateOptions}>
            {['Today', 'Tomorrow', formatDate(getEarliestDate())].map((date) => (
              <TouchableOpacity
                key={date}
                style={[styles.dateOption, selectedDate === date && styles.dateOptionSelected]}
                onPress={() => setSelectedDate(date)}
              >
                <Text style={[styles.dateOptionText, selectedDate === date && styles.dateOptionTextSelected]}>
                  {date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Time Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Times:</Text>
          <View style={styles.timeGrid}>
            {availableTimes.map((time) => (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, selectedTime === time && styles.timeSlotSelected]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextSelected]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Timeline Visualization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timeline:</Text>
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Patch Test</Text>
                <Text style={styles.timelineDate}>
                  {selectedDate} at {selectedTime || 'TBD'}
                </Text>
                <Text style={styles.timelineDesc}>15-minute appointment</Text>
              </View>
            </View>

            <View style={styles.timelineConnector} />

            <View style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Service Date</Text>
                <Text style={styles.timelineDate}>
                  {formatDate(getServiceDate())}
                </Text>
                <Text style={styles.timelineDesc}>Full color service (2.5 hours)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Schedule Button */}
        <View style={styles.scheduleSection}>
          <Button
            title="SCHEDULE 15-MINUTE APPOINTMENT"
            onPress={handleScheduleAppointment}
            disabled={!selectedTime}
            style={styles.scheduleButton}
          />
          <Text style={styles.scheduleNote}>
            Client will receive automated SMS reminders at 24h and 2h before appointment.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.softCream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: LAYOUT.screenPadding,
  },
  warningBanner: {
    backgroundColor: COLORS.warningYellow,
    borderWidth: 2,
    borderColor: COLORS.warningYellow,
    marginBottom: LAYOUT.sectionSpacing,
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  warningIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  warningTitle: {
    ...TYPOGRAPHY.h5,
    color: COLORS.deepCharcoal,
    fontWeight: '700',
  },
  warningText: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    lineHeight: 20,
  },
  section: {
    marginBottom: LAYOUT.sectionSpacing,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h5,
    color: COLORS.deepCharcoal,
    marginBottom: SPACING.md,
  },
  reasonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  reasonChip: {
    backgroundColor: COLORS.lightGray,
    borderRadius: LAYOUT.borderRadius.lg,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  reasonChipActive: {
    backgroundColor: COLORS.errorRed,
  },
  reasonText: {
    ...TYPOGRAPHY.small,
    color: COLORS.deepCharcoal,
    fontWeight: '500',
  },
  reasonTextActive: {
    color: COLORS.pureWhite,
    fontWeight: '600',
  },
  productsList: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  productBrand: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
  },
  testIndicator: {
    backgroundColor: COLORS.warningYellow,
    borderRadius: LAYOUT.borderRadius.sm,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  testText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  dateNote: {
    ...TYPOGRAPHY.small,
    color: COLORS.slateGray,
    marginBottom: SPACING.md,
  },
  dateOptions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  dateOption: {
    flex: 1,
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  dateOptionSelected: {
    borderColor: COLORS.champagneGold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  dateOptionText: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  dateOptionTextSelected: {
    color: COLORS.champagneGold,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
  },
  timeSlotSelected: {
    borderColor: COLORS.champagneGold,
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
  timeSlotText: {
    ...TYPOGRAPHY.small,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  timeSlotTextSelected: {
    color: COLORS.champagneGold,
  },
  timeline: {
    backgroundColor: COLORS.pureWhite,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.champagneGold,
    marginRight: SPACING.md,
    marginTop: SPACING.xs,
  },
  timelineContent: {
    flex: 1,
    marginBottom: SPACING.lg,
  },
  timelineTitle: {
    ...TYPOGRAPHY.regular,
    color: COLORS.deepCharcoal,
    fontWeight: '600',
  },
  timelineDate: {
    ...TYPOGRAPHY.small,
    color: COLORS.champagneGold,
    marginTop: SPACING.xs,
  },
  timelineDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.slateGray,
    marginTop: SPACING.xs,
  },
  timelineConnector: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.lightGray,
    marginLeft: 5,
    marginBottom: SPACING.sm,
  },
  scheduleSection: {
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxxl,
  },
  scheduleButton: {
    marginBottom: SPACING.md,
  },
  scheduleNote: {
    ...TYPOGRAPHY.caption,
    color: COLORS.slateGray,
    textAlign: 'center',
    lineHeight: 16,
  },
});
