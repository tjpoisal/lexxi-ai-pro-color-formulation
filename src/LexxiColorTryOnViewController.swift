import ARKit
import SceneKit
import UIKit
import Vision

// LEXXI AI: ARKit Color Try-On - Core View Controller
// This file implements the core ARKit-based hair color try-on experience
// plus hooks for ML-based hair segmentation, lighting adaptation, and
// integration with Strattora/Supabase color data.

class LexxiColorTryOnViewController: UIViewController {
    
    // MARK: - Properties
    private var sceneView: ARSCNView!
    private var faceNode: SCNNode?
    private var hairGeometry: SCNNode?
    private var currentColorHex: String = "#8B4513" // Default brunette
    
    // Color library from Strattora's 400+ brands (local cache sample)
    private let professionalColors: [String: String] = [
        "ash_blonde": "#E6E1D6",
        "platinum": "#F5F5DC",
        "warm_caramel": "#C68E6F",
        "chocolate_brown": "#4A2C2A",
        "copper_red": "#B87333",
        "violet_purple": "#8B00FF",
        "rose_gold": "#B76E79"
    ]
    
    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupARSession()
        setupUI()
    }
    
    // MARK: - AR Setup
    private func setupARSession() {
        sceneView = ARSCNView(frame: view.bounds)
        view.addSubview(sceneView)
        
        sceneView.delegate = self
        sceneView.automaticallyUpdatesLighting = true
        
        // Check device support
        guard ARFaceTrackingConfiguration.isSupported else {
            showAlert("AR Face Tracking not supported on this device")
            return
        }
        
        let configuration = ARFaceTrackingConfiguration()
        configuration.isLightEstimationEnabled = true
        configuration.maximumNumberOfTrackedFaces = 1
        
        sceneView.session.run(configuration, options: [.resetTracking, .removeExistingAnchors])
    }
    
    // MARK: - Color Application
    func applyHairColor(hex: String, blend: CGFloat = 0.7) {
        guard let hairNode = hairGeometry else { return }
        
        // Create semi-transparent material for realistic blending
        let material = SCNMaterial()
        material.diffuse.contents = UIColor(hex: hex).withAlphaComponent(blend)
        material.blendMode = .multiply // Preserves natural hair texture
        material.lightingModel = .physicallyBased
        material.roughness.contents = 0.4 // Slight shine
        material.metalness.contents = 0.1
        
        hairNode.geometry?.firstMaterial = material
        currentColorHex = hex
    }
    
    // MARK: - UI Controls
    private func setupUI() {
        let colorPicker = UIStackView()
        colorPicker.axis = .horizontal
        colorPicker.distribution = .equalSpacing
        colorPicker.spacing = 12
        
        // Add color swatches
        for (name, hex) in professionalColors {
            let button = createColorButton(name: name, hex: hex)
            colorPicker.addArrangedSubview(button)
        }
        
        view.addSubview(colorPicker)
        colorPicker.translatesAutoresizingMaskIntoConstraints = false
        NSLayoutConstraint.activate([
            colorPicker.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
            colorPicker.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20),
            colorPicker.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20),
            colorPicker.heightAnchor.constraint(equalToConstant: 60)
        ])
    }
    
    private func createColorButton(name: String, hex: String) -> UIButton {
        let button = UIButton(type: .custom)
        button.backgroundColor = UIColor(hex: hex)
        button.layer.cornerRadius = 30
        button.layer.borderWidth = 2
        button.layer.borderColor = UIColor.white.cgColor
        button.widthAnchor.constraint(equalToConstant: 60).isActive = true
        button.heightAnchor.constraint(equalToConstant: 60).isActive = true
        
        button.addTarget(self, action: #selector(colorTapped(_:)), for: .touchUpInside)
        button.accessibilityLabel = name
        
        return button
    }
    
    @objc private func colorTapped(_ sender: UIButton) {
        guard let colorName = sender.accessibilityLabel,
              let hex = professionalColors[colorName] else { return }
        
        applyHairColor(hex: hex)
        animateButtonPress(sender)
    }
    
    private func animateButtonPress(_ button: UIButton) {
        UIView.animate(withDuration: 0.1, animations: {
            button.transform = CGAffineTransform(scaleX: 0.9, y: 0.9)
        }) { _ in
            UIView.animate(withDuration: 0.1) {
                button.transform = .identity
            }
        }
    }
    
    private func showAlert(_ message: String) {
        let alert = UIAlertController(title: "LEXXI AR", message: message, preferredStyle: .alert)
        alert.addAction(UIAlertAction(title: "OK", style: .default, handler: nil))
        present(alert, animated: true, completion: nil)
    }
}

// MARK: - ARSCNViewDelegate
extension LexxiColorTryOnViewController: ARSCNViewDelegate {
    
    func renderer(_ renderer: SCNSceneRenderer, didAdd node: SCNNode, for anchor: ARAnchor) {
        guard let faceAnchor = anchor as? ARFaceAnchor,
              let device = MTLCreateSystemDefaultDevice() else { return }
        
        // Create face geometry
        let faceGeometry = ARSCNFaceGeometry(device: device)
        let faceNode = SCNNode(geometry: faceGeometry)
        node.addChildNode(faceNode)
        self.faceNode = faceNode
        
        // Create hair overlay node
        createHairOverlay(on: node, faceAnchor: faceAnchor, device: device)
    }
    
    func renderer(_ renderer: SCNSceneRenderer, didUpdate node: SCNNode, for anchor: ARAnchor) {
        guard let faceAnchor = anchor as? ARFaceAnchor,
              let faceGeometry = faceNode?.geometry as? ARSCNFaceGeometry else { return }
        
        // Update face mesh in real-time
        faceGeometry.update(from: faceAnchor.geometry)
    }
    
    private func createHairOverlay(on node: SCNNode, faceAnchor: ARFaceAnchor, device: MTLDevice) {
        // NOTE: This is a simplified placeholder implementation.
        // In production, replace with a mesh built from an ML-based hair mask.
        
        // Approximate hair region using upper-forehead vertices
        let vertices = faceAnchor.geometry.vertices
        var scnVertices: [SCNVector3] = []
        for v in vertices where v.y > 0.05 {
            scnVertices.append(SCNVector3(v.x, v.y, v.z))
        }
        
        guard !scnVertices.isEmpty else { return }
        
        let source = SCNGeometrySource(vertices: scnVertices)
        let hairGeometry = SCNGeometry(sources: [source], elements: [])
        let hairNode = SCNNode(geometry: hairGeometry)
        node.addChildNode(hairNode)
        self.hairGeometry = hairNode
        
        // Apply default color
        applyHairColor(hex: currentColorHex)
    }
}

// MARK: - ML-Based Hair Segmentation (stub hook)
extension LexxiColorTryOnViewController {
    func segmentHairUsingML(image: CVPixelBuffer) -> CIImage? {
        let request = VNGeneratePersonSegmentationRequest()
        request.qualityLevel = .accurate
        request.outputPixelFormat = kCVPixelFormatType_OneComponent8
        
        let handler = VNImageRequestHandler(cvPixelBuffer: image, options: [:])
        try? handler.perform([request])
        
        guard let observation = request.results?.first,
              let maskBuffer = observation.pixelBuffer else { return nil }
        
        // Placeholder: production implementation should isolate hair class only.
        return CIImage(cvPixelBuffer: maskBuffer)
    }
    
    func adjustColorForLighting(_ baseColor: UIColor, lightEstimate: ARLightEstimate?) -> UIColor {
        guard let intensity = lightEstimate?.ambientIntensity else { return baseColor }
        
        let adjustedBrightness = min(1.0, intensity / 1000.0)
        var hue: CGFloat = 0, saturation: CGFloat = 0, brightness: CGFloat = 0, alpha: CGFloat = 0
        baseColor.getHue(&hue, saturation: &saturation, brightness: &brightness, alpha: &alpha)
        
        return UIColor(hue: hue,
                       saturation: saturation * adjustedBrightness,
                       brightness: brightness * adjustedBrightness,
                       alpha: alpha)
    }
    
    func captureComparison(selectedColorHex: String) {
        let beforeImage = sceneView.snapshot() // Original hair
        applyHairColor(hex: selectedColorHex)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
            let afterImage = self.sceneView.snapshot()
            self.showSideBySide(before: beforeImage, after: afterImage)
        }
    }
    
    private func showSideBySide(before: UIImage, after: UIImage) {
        // Placeholder: push a comparison view controller with two UIImageViews.
        // Implement UI/UX in the main app layer.
    }
}

// MARK: - Strattora / Supabase Integration (hook)
struct ColorOption: Codable {
    let name: String
    let hexCode: String
    let brand: String // "Wella", "Redken", etc.
    let line: String  // "Color Touch", "Shades EQ", etc.
}

// Replace `AnySupabaseClient` with your concrete Supabase client type
protocol AnySupabaseClient {
    func fetchHairColors() async throws -> Data
}

extension LexxiColorTryOnViewController {
    func fetchProfessionalColors(using supabase: AnySupabaseClient) async throws -> [ColorOption] {
        let data = try await supabase.fetchHairColors()
        return try JSONDecoder().decode([ColorOption].self, from: data)
    }
}

// MARK: - UIColor Extension
extension UIColor {
    convenience init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 6: // RGB
            (a, r, g, b) = (255, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        case 8: // ARGB
            (a, r, g, b) = ((int >> 24) & 0xFF, (int >> 16) & 0xFF, (int >> 8) & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(red: CGFloat(r) / 255,
                  green: CGFloat(g) / 255,
                  blue: CGFloat(b) / 255,
                  alpha: CGFloat(a) / 255)
    }
}
