// Define pin numbers
#include <esp32-hal-gpio.h>
#include <HardwareSerial.h>
#define indikLED 13
#define analogPin A0

// Define constant for measurement delay
const int measurementDelay = 60;

void setup() {
// Serial communication at 9600 baud rate
Serial.begin(9600);

// Initialize analog pin as input and digital pin as output
pinMode(analogPin, INPUT);
pinMode(indikLED, OUTPUT);
}
bool detectBeat(int sensorPin, int delay);

void loop() {
// Temporary variables to store results
static int beatsPerMinute = 0;
int heartRate = 0;

// Check for heartbeat detection using the detectBeat subroutine
if (detectBeat(analogPin, measurementDelay)) {
// Calculate heart rate
heartRate = 60000 / beatsPerMinute;
// Turn on indicator LED when heartbeat is detected
digitalWrite(indikLED, HIGH);

// Print information about the measured heart rate
if (heartRate > 50 && heartRate < 200) {
  Serial.print("Heart Rate: ");
  Serial.print(heartRate);
  Serial.println(" beats per minute (BPM).");
}

// Reset variable for next measurement
beatsPerMinute = 0;
} else {
// Turn off indicator LED if no heartbeat is detected
digitalWrite(indikLED, LOW);
}

// Program pause until next measurement
delay(measurementDelay);

// Add delay for next measurement
beatsPerMinute += measurementDelay;
}

// Subroutine for heartbeat detection and calculation of its frequency
bool detectBeat(int sensorPin, int delay) {
// Auxiliary variables
static int maxValue = 0;
static bool peakValue = false;
int analogValue;
bool result = false;

// Read analog value from sensor
analogValue = analogRead(sensorPin);

// Convert analog value for further calculations
analogValue *= (1000 / delay);

// Adjust maximum value
if (analogValue * 4L < maxValue) {
maxValue = analogValue * 0.8;
}

// Detect peak value
if (analogValue > maxValue - (1000 / delay)) {
// Set new maximum when peak is detected
if (analogValue > maxValue) {
maxValue = analogValue;
}
// Set result validity when no peak was detected
if (peakValue == false) {
  result = true;
}
peakValue = true;
} else if (analogValue < maxValue - (3000 / delay)) {
peakValue = false;

// Adjust maximum value when measured values change
maxValue -= (1000 / delay);
}

// Return result of the subroutine
return result;
}
