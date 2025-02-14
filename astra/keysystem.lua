

local player = game.Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")
local existingGui = playerGui:FindFirstChild("AstraExecutorGUI")
if existingGui then
    existingGui:Destroy()
end

-- Create the main GUI frame
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "AstraExecutorGUI"
screenGui.Parent = game.Players.LocalPlayer:WaitForChild("PlayerGui")

local mainFrame = Instance.new("Frame")
mainFrame.Name = "MainFrame"
mainFrame.Size = UDim2.new(0, 400, 0, 200)
mainFrame.Position = UDim2.new(0.5, -200, 0.5, -100)
mainFrame.BackgroundColor3 = Color3.fromRGB(30, 30, 30)
mainFrame.BorderSizePixel = 0
mainFrame.AnchorPoint = Vector2.new(0.5, 0.5)
mainFrame.Parent = screenGui

-- Apply corner radius
local mainCorner = Instance.new("UICorner")
mainCorner.CornerRadius = UDim.new(0, 10)
mainCorner.Parent = mainFrame

-- Apply shadow effect
local shadow = Instance.new("ImageLabel")
shadow.Name = "Shadow"
shadow.Size = UDim2.new(1, 20, 1, 20)
shadow.Position = UDim2.new(0.5, 0, 0.5, 0)
shadow.AnchorPoint = Vector2.new(0.5, 0.5)
shadow.BackgroundTransparency = 1
shadow.Image = "rbxassetid://1316045217" -- Shadow image asset
shadow.ImageColor3 = Color3.new(0, 0, 0)
shadow.ImageTransparency = 0.5
shadow.ScaleType = Enum.ScaleType.Slice
shadow.SliceCenter = Rect.new(10, 10, 118, 118)
shadow.Parent = mainFrame

-- Create the top bar
local topBar = Instance.new("Frame")
topBar.Name = "TopBar"
topBar.Size = UDim2.new(1, 0, 0, 40)
topBar.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
topBar.BorderSizePixel = 0
topBar.Parent = mainFrame

local topBarCorner = Instance.new("UICorner")
topBarCorner.CornerRadius = UDim.new(0, 10)
topBarCorner.Parent = topBar

local scriptNameLabel = Instance.new("TextLabel")
scriptNameLabel.Name = "ScriptNameLabel"
scriptNameLabel.Size = UDim2.new(1, -20, 1, 0)
scriptNameLabel.Position = UDim2.new(0, 10, 0, 0)
scriptNameLabel.BackgroundTransparency = 1
scriptNameLabel.Text = getgenv().AstraClient.ScriptName
scriptNameLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
scriptNameLabel.TextScaled = true
scriptNameLabel.Font = Enum.Font.GothamBold
scriptNameLabel.TextXAlignment = Enum.TextXAlignment.Left
scriptNameLabel.Parent = topBar


local dragging = false
local dragInput, mousePos, framePos

topBar.InputBegan:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseButton1 then
        dragging = true
        mousePos = input.Position
        framePos = mainFrame.Position

        input.Changed:Connect(function()
            if input.UserInputState == Enum.UserInputState.End then
                dragging = false
            end
        end)
    end
end)

topBar.InputChanged:Connect(function(input)
    if input.UserInputType == Enum.UserInputType.MouseMovement then
        dragInput = input
    end
end)

game:GetService("UserInputService").InputChanged:Connect(function(input)
    if input == dragInput and dragging then
        local delta = input.Position - mousePos
        mainFrame.Position = UDim2.new(
            framePos.X.Scale,
            framePos.X.Offset + delta.X,
            framePos.Y.Scale,
            framePos.Y.Offset + delta.Y
        )
    end
end)

-- Create the key input field
local keyInput = Instance.new("TextBox")
keyInput.Name = "KeyInput"
keyInput.Size = UDim2.new(0.8, 0, 0, 40)
keyInput.Position = UDim2.new(0.1, 0, 0, 60)
keyInput.BackgroundColor3 = Color3.fromRGB(40, 40, 40)
keyInput.BorderSizePixel = 0
keyInput.PlaceholderText = "Enter key here"
keyInput.PlaceholderColor3 = Color3.fromRGB(150, 150, 150)
keyInput.TextColor3 = Color3.fromRGB(255, 255, 255)
keyInput.TextScaled = true
keyInput.Font = Enum.Font.Gotham
keyInput.Parent = mainFrame

local keyInputCorner = Instance.new("UICorner")
keyInputCorner.CornerRadius = UDim.new(0, 5)
keyInputCorner.Parent = keyInput

-- Create the "Get Key" button
local getKeyButton = Instance.new("TextButton")
getKeyButton.Name = "GetKeyButton"
getKeyButton.Size = UDim2.new(0.35, 0, 0, 40)
getKeyButton.Position = UDim2.new(0.1, 0, 0, 110)
getKeyButton.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
getKeyButton.BorderSizePixel = 0
getKeyButton.Text = "Get Key"
getKeyButton.TextColor3 = Color3.fromRGB(255, 255, 255)
getKeyButton.TextScaled = true
getKeyButton.Font = Enum.Font.GothamBold
getKeyButton.Parent = mainFrame

local getKeyButtonCorner = Instance.new("UICorner")
getKeyButtonCorner.CornerRadius = UDim.new(0, 5)
getKeyButtonCorner.Parent = getKeyButton

-- Create the "Submit" button
local submitButton = Instance.new("TextButton")
submitButton.Name = "SubmitButton"
submitButton.Size = UDim2.new(0.35, 0, 0, 40)
submitButton.Position = UDim2.new(0.55, 0, 0, 110)
submitButton.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
submitButton.BorderSizePixel = 0
submitButton.Text = "Submit"
submitButton.TextColor3 = Color3.fromRGB(255, 255, 255)
submitButton.TextScaled = true
submitButton.Font = Enum.Font.GothamBold
submitButton.Parent = mainFrame

-- Apply rounded corners to the "Submit" button
local submitButtonCorner = Instance.new("UICorner")
submitButtonCorner.CornerRadius = UDim.new(0, 5)
submitButtonCorner.Parent = submitButton

-- Apply a border (stroke) to the "Submit" button
local submitButtonStroke = Instance.new("UIStroke")
submitButtonStroke.Color = Color3.fromRGB(70, 70, 70)
submitButtonStroke.Thickness = 2
submitButtonStroke.ApplyStrokeMode = Enum.ApplyStrokeMode.Border
submitButtonStroke.Parent = submitButton

getKeyButton.MouseButton1Click:Connect(function()
    local keyWebsite = getgenv().AstraClient.KeyWebsite
    if keyWebsite then
        if setclipboard then
            setclipboard(keyWebsite)
            game.StarterGui:SetCore("SendNotification",{
                Title = getgenv().AstraClient.ScriptName,
                Text = "Copied to clipboard!",
                Time = 3
            })
        else
            warn("[Astra] Clipboard functionality is not available.")
        end
    else
        warn("[Astra] Key website URL is not defined.")
    end
end)

submitButton.MouseButton1Click:Connect(function()
    local enteredKey = keyInput.Text
    local correctKey = getgenv().AstraClient.ProductKey

    if enteredKey == correctKey then
        local scriptToExecute = getgenv().AstraClient.Script
        if scriptToExecute then
            loadstring(scriptToExecute)()
            screenGui:Destroy()
        else
            warn("[Astra] Script to execute is not defined.")
        end
    else
        keyInput.Text = ""
        keyInput.PlaceholderText = "Invalid key, try again."
        keyInput.PlaceholderColor3 = Color3.fromRGB(255, 0, 0)
    end
end)


if not getgenv().AstraClient then
    if existingGui then
        warn("[Astra] Config is not set up correctly!")
        existingGui:Destroy()
    end
end
