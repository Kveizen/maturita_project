#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>

const int triggerPin = PIN_DAC2;
const int echoPin = PIN_DAC1;
const int pushupThreshold = 10; // Adjust as needed
const int maxDistance = 200;    // Maximum distance the ultrasonic sensor can detect in centimeters

unsigned long startTime;
unsigned long endTime;
unsigned long totalTime;
int pushupCount = 0;

BLECharacteristic *pCharacteristic;
bool zarizeniPripojeno = false;
std::string prijataZprava;
// definice unikátních ID pro různé služby,
// pro vlastní UUID využijte generátor
// https://www.uuidgenerator.net/
#define SERVICE_UUID "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

class MyServerCallbacks : public BLEServerCallbacks
{
  void onConnect(BLEServer *pServer)
  {
    zarizeniPripojeno = true;
    Serial.println("Pripojeno k BLE zarizeni..");
  };
  void onDisconnect(BLEServer *pServer)
  {
    zarizeniPripojeno = false;
  }
};

class MyCallbacks : public BLECharacteristicCallbacks
{
  void onWrite(BLECharacteristic *pCharacteristic)
  {
    prijataZprava = pCharacteristic->getValue();
    if (prijataZprava.length() > 0)
    {
      Serial.print("Prijata zprava: ");
      for (int i = 0; i < prijataZprava.length(); i++)
      {
        Serial.print(prijataZprava[i]);
      }
      Serial.println();
    }
  }
};

void setup()
{
  Serial.begin(9600);
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  BLEDevice::init("fitnes_tracker_3000");

  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID_TX,
      BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY | BLECharacteristic::PROPERTY_WRITE);
  pCharacteristic->addDescriptor(new BLE2902());
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID_RX,
      BLECharacteristic::PROPERTY_READ);
  pCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("BLE nastaveno..");
}
void loop()
{
  if (zarizeniPripojeno == false)
  {
    Serial.println("BLE ceka na pripojeni..");
    delay(1000);
  }

  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  long duration = pulseIn(echoPin, HIGH);
  double distance = duration * 0.0343 / 2; // Speed of sound is 0.0343 cm/µs

  // Check if someone is close enough for a pushup
  if (distance < pushupThreshold)
  {
    if (endTime == 0)
    {
      startTime = millis();
      Serial.println("Start counting pushup...");
    }
    endTime = millis();
  }
  
  else
  {
    if (endTime != 0)
    {
      totalTime = endTime - startTime;
      if (totalTime < 2000)
      { 
        // Assuming a pushup takes less than 2 seconds
        pushupCount++;

        String zprava = "Pocet pushupu: ";
        zprava += pushupCount;
        zprava += "\n";
        char zpravaChar[zprava.length() + 1];
        zprava.toCharArray(zpravaChar, zprava.length() + 1);
        pCharacteristic->setValue(zpravaChar);
        pCharacteristic->notify();
        Serial.print("*** Odeslana zprava: ");
        Serial.print(zprava);
      }
      endTime = 0;
    }
  }

  delay(100);
}