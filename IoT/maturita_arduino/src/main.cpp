#include <Arduino.h>

const int triggerPin = D2;
const int echoPin = D3;
const int pushupThreshold = 10; // Adjust as needed
const int maxDistance = 200; // Maximum distance the ultrasonic sensor can detect in centimeters

unsigned long startTime;
unsigned long endTime;
unsigned long totalTime;
int pushupCount = 0;

void setup() {
  Serial.begin(9600);
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, distance;
  
  // Trigger the ultrasonic sensor
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  
  // Measure the pulse from the echo pin
  duration = pulseIn(echoPin, HIGH);
  
  // Calculate distance
  distance = duration * 0.034 / 2; // Speed of sound is 0.034 cm/µs
  
  Serial.print("Distance: ");
  Serial.println(distance);
  
  // Check if someone is close enough for a pushup
  if (distance < pushupThreshold) {
    if (endTime == 0) {
      startTime = millis();
      Serial.println("Start counting pushup...");
    }
    endTime = millis();
  } else {
    if (endTime != 0) {
      totalTime = endTime - startTime;
      if (totalTime < 2000) { // Assuming a pushup takes less than 2 seconds
        pushupCount++;
        Serial.print("Pushup count: ");
        Serial.println(pushupCount);
      }
      endTime = 0;
    }
  }
  
  delay(100); // Adjust delay as needed
}
