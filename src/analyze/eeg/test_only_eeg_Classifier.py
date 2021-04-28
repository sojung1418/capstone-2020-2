from eegAnalyzeModule import * # ** 
from sensorModule import *
import pickle
import numpy as np
import keyboard
import sys

n_sec = 6
n_ch = 8
sf =  256 #board.get_sampling_rate(0)
eeg_channels = [i for i in range(0,8)]
splitted_signal = []

# =======================================
if __name__ == '__main__':
    has_sensor = True if sys.argv[1] == 'y' else False
    
    if has_sensor:
        try:
            board = set_board() 
            start_record(board)
        except:
            print("Can't connect to an EEG sensor")
            sys.exit(1)
        
    while True:
        if keyboard.is_pressed('q') :
            break
        time.sleep(1) # save recent n_seconds signal for every 1 second.
        if has_sensor:
            temp_signal = board.get_current_board_data(n_sec * sf) # latest data from a board **
        else:
            temp_signal = np.random.rand(8, n_sec * sf)
        
        temp_signal = temp_signal[eeg_channels, :]
        splitted_signal.append(temp_signal)

        # save 
        eeg_save_path = "test_signal.pickle"
        with open(eeg_save_path, 'wb') as f:
            pickle.dump(temp_signal, f)
            
        # 여기다 넣어본다.. =============================== ***
        eeg_emotion, n_railed, is_railed = predict_emotion_EEG(model, "test_signal.pickle", chosen_channels, freqs, sf=256)
        max_idx = np.argmax(eeg_emotion[0,:].detach().numpy())
        result_emo = emo_map[max_idx]
        
        if n_railed != 0:
            print("Railed Channels = ", railed_channels)
        print("Result Emotion = ", result_emo)
        # =============================================== ***
        
    # whole signal (Warn : could contain railed signals)
    if has_sensor:
        total_signal = board.get_board_data() # get all data and remove it from internal buffer
        total_signal = total_signal[eeg_channels, :]
        print("Total signal length = ", total_signal.shape[1] // sf)
        
        stop_record(board)
    print("Connection closed")
    sys.exit(0)