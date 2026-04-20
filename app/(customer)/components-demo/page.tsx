'use client'

import { useState } from 'react'
import { 
  Button, 
  Input, 
  Textarea, 
  Select, 
  Modal, 
  Badge, 
  Card,
  Loading,
  Skeleton,
  Spinner
} from '@/components/shared/ui'
import { ShoppingBag, Heart } from 'lucide-react'

export default function ComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-brand-cream-200 py-12">
      <div className="container-luxury">
        <h1 className="font-serif text-5xl mb-12 text-center text-brand-green-800 tracking-wider">
          Mulaan UI Components
        </h1>

        <div className="space-y-12">
          {/* Buttons */}
          <Card className="p-8">
            <h2 className="font-serif text-3xl mb-6 text-brand-green-800">Buttons</h2>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="gold">Gold Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button isLoading>Loading...</Button>
                <Button disabled>Disabled</Button>
                <Button variant="primary">
                  <ShoppingBag className="w-4 h-4" />
                  With Icon
                </Button>
              </div>
            </div>
          </Card>

          {/* Form Inputs */}
          <Card className="p-8">
            <h2 className="font-serif text-3xl mb-6 text-brand-green-800">Form Inputs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Input 
                label="Full Name" 
                placeholder="Enter your name"
                required
              />
              <Input 
                label="Email" 
                type="email"
                placeholder="your@email.com"
                helperText="We'll never share your email"
              />
              <Input 
                label="Error Example" 
                error="This field is required"
                placeholder="Enter something"
              />
              <Select
                label="Size"
                options={[
                  { value: 'xs', label: 'Extra Small' },
                  { value: 's', label: 'Small' },
                  { value: 'm', label: 'Medium' },
                  { value: 'l', label: 'Large' },
                  { value: 'xl', label: 'Extra Large' },
                ]}
                placeholder="Select a size"
              />
              <div className="md:col-span-2">
                <Textarea 
                  label="Message"
                  placeholder="Your message here..."
                  helperText="Maximum 500 characters"
                />
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-8">
            <h2 className="font-serif text-3xl mb-6 text-brand-green-800">Badges</h2>
            <div className="flex flex-wrap gap-4">
              <Badge variant="new">New Arrival</Badge>
              <Badge variant="sold-out">Sold Out</Badge>
              <Badge variant="pre-order">Pre-Order</Badge>
              <Badge variant="last-pieces">Last Pieces</Badge>
              <Badge variant="featured">Featured</Badge>
            </div>
          </Card>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card hover className="p-6">
              <Badge variant="new" className="mb-4">New</Badge>
              <h3 className="font-serif text-xl mb-2 text-brand-green-800">
                Hover Card
              </h3>
              <p className="text-gray-600">
                This card has a hover effect with shadow and border color change.
              </p>
            </Card>
            <Card className="p-6">
              <Badge variant="featured" className="mb-4">Featured</Badge>
              <h3 className="font-serif text-xl mb-2 text-brand-green-800">
                Regular Card
              </h3>
              <p className="text-gray-600">
                This is a standard card without hover effects.
              </p>
            </Card>
            <Card hover className="p-6" onClick={() => alert('Clicked!')}>
              <Badge variant="pre-order" className="mb-4">Pre-Order</Badge>
              <h3 className="font-serif text-xl mb-2 text-brand-green-800">
                Clickable Card
              </h3>
              <p className="text-gray-600">
                Click me! This card has an onClick handler.
              </p>
            </Card>
          </div>

          {/* Modal */}
          <Card className="p-8">
            <h2 className="font-serif text-3xl mb-6 text-brand-green-800">Modal</h2>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="md"
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  This is a modal dialog. It has a backdrop and can be closed by clicking outside or the X button.
                </p>
                <Input label="Name" placeholder="Enter your name" />
                <Textarea label="Message" placeholder="Your message" />
                <div className="flex gap-4 justify-end">
                  <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary">
                    Submit
                  </Button>
                </div>
              </div>
            </Modal>
          </Card>

          {/* Loading States */}
          <Card className="p-8">
            <h2 className="font-serif text-3xl mb-6 text-brand-green-800">Loading States</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="mb-4 font-medium text-brand-green-800">Small Spinner</p>
                <Spinner size="sm" />
              </div>
              <div className="text-center">
                <p className="mb-4 font-medium text-brand-green-800">Medium Spinner</p>
                <Spinner size="md" />
              </div>
              <div className="text-center">
                <p className="mb-4 font-medium text-brand-green-800">Large Spinner</p>
                <Spinner size="lg" />
              </div>
            </div>
            <div className="mt-8">
              <p className="mb-4 font-medium text-brand-green-800">Loading Component</p>
              <Loading text="Loading..." />
            </div>
            <div className="mt-8">
              <p className="mb-4 font-medium text-brand-green-800">Skeleton Loaders</p>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}